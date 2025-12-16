import { useState } from 'react';
import SectionHeader from '../ui/SectionHeader';
import { BODY_TEXT, PANEL_PADDED, SECTION_STACK } from '../ui/layoutTokens';
import Tooltip from '../ui/Tooltip';
import { usePlatform } from '../../hooks/usePlatform';
import Editor from '@monaco-editor/react';

const toolbarItems = ['File', 'Exercise', 'Run', 'Install Library', 'Generate Token'];

const defaultCode = [
  "from robot_core import Rover",
  "from sensors import Lidar, IMU",
  "",
  "rover = Rover(name=\"Explorer\")",
  "lidar = Lidar(port=\"/dev/ttyUSB0\")",
  "",
  "def bootstrap():",
  "    rover.attach_sensor(lidar)",
  "    rover.attach_sensor(IMU())",
  "    rover.calibrate()",
  "",
  "if __name__ == \"__main__\":",
  "    bootstrap()",
  "    rover.run_autonomy()",
].join('\n');

const editorOptions = {
  fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: 13,
  lineHeight: 20,
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  smoothScrolling: true,
  automaticLayout: true,
  cursorBlinking: 'phase',
  bracketPairColorization: { enabled: true },
  padding: { top: 16, bottom: 16 },
  wordWrap: 'on',
  renderWhitespace: 'selection',
  scrollbar: {
    verticalScrollbarSize: 8,
    horizontalScrollbarSize: 8,
  },
};

function CodeLabSection({
  icon,
  code = defaultCode,
  onCodeChange,
  onRun,
  onOpenEditor,
  onOpenUtilities,
  onCreateNewFile,
  consoleLines = [],
  status = 'Idle',
  onClearConsole,
  files = [],
  onFileChange,
  onDeleteFile,
  onRenameFile,
}) {
  const { modifierKey } = usePlatform();
  const isRunning = status === 'Running';
  const [renamingFile, setRenamingFile] = useState(null);
  const [renameValue, setRenameValue] = useState('');

  const handleToolbarClick = (item) => {
    switch (item) {
      case 'Run':
        if (onRun) {
          onRun();
        } else if (onOpenEditor) {
          onOpenEditor();
        }
        break;
      case 'Install Library':
      case 'Generate Token':
        if (onOpenUtilities) onOpenUtilities();
        break;
      case 'File':
        if (onCreateNewFile) onCreateNewFile();
        break;
      case 'Exercise':
        // Future: Show exercise templates
        break;
      default:
        break;
    }
  };

  return (
    <section className={SECTION_STACK}>
      <SectionHeader icon={icon} title="Code Lab" eyebrow="Programming Interface" />

      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 px-6 py-4 text-sm font-semibold uppercase tracking-wide text-slate-200">
        {toolbarItems.map((item, index) => {
          const isActionable = ['Run', 'File', 'Install Library', 'Generate Token'].includes(item);
          const tooltipMap = {
            File: `Create new file (${modifierKey}+N)`,
            Exercise: 'Browse exercise templates',
            Run: isRunning ? 'Code is running...' : `Execute code (${modifierKey}+R or F5)`,
            'Install Library': 'Install Python libraries',
            'Generate Token': 'Generate network token',
          };

          return (
            <div key={item} className="flex items-center gap-4">
              <Tooltip content={tooltipMap[item] || item} position="bottom">
                <button
                  type="button"
                  onClick={() => handleToolbarClick(item)}
                  disabled={(item === 'Run' && isRunning) || (!isActionable && item !== 'Exercise')}
                  className="transition hover:text-white disabled:cursor-not-allowed disabled:text-slate-500 disabled:hover:text-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
                  aria-label={tooltipMap[item] || item}
                >
                  {item}
                </button>
              </Tooltip>
              {index < toolbarItems.length - 1 ? <span className="text-slate-600">|</span> : null}
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {files.length > 0 && (
                <div className="flex items-center gap-2">
                  {files.map((file) => (
                    <div
                      key={file.name}
                      className={`group flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                        file.active
                          ? 'bg-emerald-500/20 text-emerald-200'
                          : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800/80'
                      }`}
                    >
                      {renamingFile === file.name ? (
                        <input
                          type="text"
                          value={renameValue}
                          onChange={(e) => setRenameValue(e.target.value)}
                          onBlur={() => {
                            if (renameValue.trim() && renameValue !== file.name && onRenameFile) {
                              onRenameFile(file.name, renameValue.trim());
                            }
                            setRenamingFile(null);
                            setRenameValue('');
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              if (renameValue.trim() && renameValue !== file.name && onRenameFile) {
                                onRenameFile(file.name, renameValue.trim());
                              }
                              setRenamingFile(null);
                              setRenameValue('');
                            } else if (e.key === 'Escape') {
                              setRenamingFile(null);
                              setRenameValue('');
                            }
                          }}
                          className="flex-1 bg-slate-900/80 text-emerald-200 px-2 py-1 rounded border border-emerald-500/50 focus:outline-none focus:border-emerald-400 text-xs"
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => onFileChange && onFileChange(file.name)}
                            onDoubleClick={() => {
                              if (onRenameFile) {
                                setRenamingFile(file.name);
                                setRenameValue(file.name);
                              }
                            }}
                            className="flex-1 text-left"
                            aria-label={`Switch to ${file.name}. Double-click to rename.`}
                            title="Double-click to rename"
                          >
                            {file.name}
                          </button>
                          {onDeleteFile && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteFile(file.name);
                              }}
                              className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-400 focus:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400 rounded"
                              aria-label={`Delete ${file.name}`}
                              title={files.length === 1 ? "Cannot delete the last file" : "Delete file"}
                            >
                              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                              </svg>
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Tooltip content={`Create new file (${modifierKey}+N)`}>
                <button
                  type="button"
                  onClick={() => {
                    if (onCreateNewFile) onCreateNewFile();
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/80 text-slate-300 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
                  title="Add new file"
                  aria-label="Create new file"
                >
                  <span className="text-2xl leading-none">+</span>
                </button>
              </Tooltip>
              <Tooltip content={isRunning ? 'Code is running...' : `Execute code (${modifierKey}+R)`}>
                <button
                  type="button"
                  onClick={() => {
                    if (onRun) {
                      onRun();
                    } else if (onOpenEditor) {
                      onOpenEditor();
                    }
                  }}
                  disabled={isRunning}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/90 text-emerald-950 shadow-lg shadow-emerald-800/40 transition hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
                  title="Run code"
                  aria-label={isRunning ? 'Code is running' : 'Run code'}
                >
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M5.333 3.2 12 8l-6.667 4.8V3.2z" />
                  </svg>
                </button>
              </Tooltip>
            </div>
          </div>
          <div className="flex-1 rounded-xl border border-slate-800/80 bg-[#1e1f26] overflow-hidden min-h-[400px]">
            <Editor
              height="100%"
              defaultLanguage="python"
              value={code}
              onChange={(value) => onCodeChange && onCodeChange(value || '')}
              theme="vs-dark"
              options={editorOptions}
              loading={
                <div className="flex h-full items-center justify-center text-slate-400">
                  <div className="text-center">
                    <div className="mb-2 h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent mx-auto" />
                    <p className="text-sm">Loading editor...</p>
                  </div>
                </div>
              }
            />
          </div>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Output Console</h3>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-slate-900/80 px-3 py-1 text-xs uppercase tracking-wide text-slate-400">
                Status: {status}
              </span>
              {onClearConsole && (
                <button
                  type="button"
                  onClick={onClearConsole}
                  disabled={consoleLines.length <= 1}
                  className="text-xs uppercase tracking-wide text-slate-400 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 disabled:cursor-not-allowed disabled:text-slate-600"
                  aria-label="Clear console"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          <div className="flex-1 min-h-[400px] overflow-y-auto rounded-xl border border-slate-800/80 bg-slate-950/80 p-4 font-mono">
            {consoleLines.length ? (
              <pre className="whitespace-pre-wrap text-xs text-slate-300 leading-relaxed">
                {consoleLines.join('\n')}
              </pre>
            ) : (
              <p className="text-xs text-slate-500">Console empty. Run the program to see output.</p>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}

export default CodeLabSection;

