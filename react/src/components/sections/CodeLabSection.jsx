import { useState, useEffect } from 'react';
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
  onOpenInstallLibrary,
  onOpenGenerateToken,
  onCreateNewFile,
  consoleLines = [],
  status = 'Idle',
  onClearConsole,
  files = [],
  onFileChange,
  onDeleteFile,
  onRenameFile,
  hasStartedCoding = false,
  isFullScreen = false,
  onEnterFullScreen,
  onExitFullScreen,
}) {
  const { modifierKey } = usePlatform();
  const isRunning = status === 'Running';
  const [renamingFile, setRenamingFile] = useState(null);
  const [renameValue, setRenameValue] = useState('');
  const [pythonVersion, setPythonVersion] = useState({ version: '3.11+', status: 'checking' });

  // Check Python version on mount
  useEffect(() => {
    const checkPythonVersion = async () => {
      if (!window.electronAPI) {
        setPythonVersion({ version: 'Not available', status: 'error', error: 'Electron API not available' });
        return;
      }

      try {
        const result = await window.electronAPI.checkPythonVersion();
        if (result.success) {
          setPythonVersion({ version: result.version, status: 'success', command: result.command });
        } else {
          setPythonVersion({ version: 'Not found', status: 'error', error: result.error });
        }
      } catch (error) {
        setPythonVersion({ version: 'Error', status: 'error', error: error.message });
      }
    };

    checkPythonVersion();
  }, []);

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
        if (onOpenInstallLibrary) onOpenInstallLibrary();
        break;
      case 'Generate Token':
        if (onOpenGenerateToken) onOpenGenerateToken();
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

  // Show intro view if user hasn't started coding yet
  if (!hasStartedCoding) {
    return (
      <section className={SECTION_STACK}>
        <SectionHeader icon={icon} title="Code Lab" eyebrow="Programming Interface" />
        
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-8">
          <div className="max-w-3xl">
            <h3 className="text-2xl font-semibold text-white mb-4">Welcome to Code Lab</h3>
            <p className="text-base text-slate-300 mb-6 leading-relaxed">
              Code Lab is your integrated programming environment for robotics development. Write Python code, 
              execute simulations, and interact with sensors and controllers—all within Robot Studio's offline-first workspace.
            </p>

            <div className="mb-8">
              <h4 className="text-lg font-semibold text-white mb-4">Code Lab Environment Details</h4>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <h5 className="text-sm font-semibold text-white">Python Version</h5>
                  </div>
                  {pythonVersion.status === 'checking' ? (
                    <>
                      <p className="text-sm text-emerald-300 font-medium">Checking...</p>
                      <p className="text-xs text-slate-400 mt-2">Detecting Python installation...</p>
                    </>
                  ) : pythonVersion.status === 'error' ? (
                    <>
                      <p className="text-sm text-rose-400 font-medium">{pythonVersion.version}</p>
                      <p className="text-xs text-slate-400 mt-2">{pythonVersion.error || 'Python not found. Please install Python 3.11+ from python.org'}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-emerald-300 font-medium">{pythonVersion.version}</p>
                      <p className="text-xs text-slate-400 mt-2">Using system Python interpreter ({pythonVersion.command || 'python3'})</p>
                    </>
                  )}
                </div>

                <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M6 20h12a2 2 0 0 0 2-2v-4" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M18 8 12 14 6 8" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 4v10" />
                      </svg>
                    </div>
                    <h5 className="text-sm font-semibold text-white">Supported Libraries</h5>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['numpy', 'opencv', 'scipy', 'matplotlib', 'pandas', 'pyserial'].map((lib) => (
                      <span key={lib} className="rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300 border border-emerald-500/20">
                        {lib}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 mt-3">Pre-installed and ready to use</p>
                </div>

                <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-5 sm:col-span-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h5 className="text-sm font-semibold text-white">Hardware Support</h5>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3 mt-4">
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" strokeWidth="1.6" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                      </svg>
                      <span className="text-sm text-slate-300">Sensors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.6" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M9 9h6M9 15h6" />
                      </svg>
                      <span className="text-sm text-slate-300">Controllers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm text-slate-300">Simulation API</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-3">Full integration with robotics hardware and simulation environments</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-lg font-semibold text-white mb-4">How to Use Code Lab</h4>
              <div className="space-y-4">
                <div className="flex gap-4 rounded-xl border border-slate-800/80 bg-slate-950/60 p-5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-sm flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-semibold text-white mb-1">Install Required Libraries</h5>
                    <p className="text-sm text-slate-300">
                      Use the Install Library option from the Code Lab top menu to add necessary packages before writing code.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-xl border border-slate-800/80 bg-slate-950/60 p-5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-sm flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-semibold text-white mb-1">Generate Access Token</h5>
                    <p className="text-sm text-slate-300">
                      Generate a token using the Generate Token option to securely enable execution and hardware access.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-xl border border-slate-800/80 bg-slate-950/60 p-5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-sm flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-semibold text-white mb-1">Start Writing Code</h5>
                    <p className="text-sm text-slate-300">
                      Once libraries are installed and token is generated, you can begin coding and running programs.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-xl border border-slate-800/80 bg-slate-950/60 p-5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-sm flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-semibold text-white mb-1">Execute & View Output</h5>
                    <p className="text-sm text-slate-300">
                      Use the Run option to execute the code and view logs/output in the Output Console.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (onEnterFullScreen) {
                  onEnterFullScreen();
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-emerald-950 shadow-lg shadow-emerald-800/40 transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Enter Coding Mode
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={isFullScreen ? 'h-screen flex flex-col' : SECTION_STACK}>
      {!isFullScreen && <SectionHeader icon={icon} title="Code Lab" eyebrow="Programming Interface" />}
      {isFullScreen && (
        <div className="flex items-center justify-between mb-4 px-2">
          <h2 className="text-xl font-semibold text-white">Code Lab - Full Screen Mode</h2>
          <button
            type="button"
            onClick={() => {
              if (onExitFullScreen) {
                onExitFullScreen();
              }
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700/60 bg-slate-800/80 text-slate-400 transition hover:border-slate-500/80 hover:bg-slate-700/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
            aria-label="Exit full screen"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className={`flex flex-wrap items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 px-6 py-4 text-sm font-semibold uppercase tracking-wide text-slate-200 ${isFullScreen ? 'mb-4' : ''}`}>
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

      <div className={`grid gap-6 ${isFullScreen ? 'grid-cols-[1.1fr_0.9fr] flex-1' : 'lg:grid-cols-[1.1fr_0.9fr]'}`}>
        <article className={`rounded-2xl border border-slate-800 bg-slate-900/70 p-6 flex flex-col ${isFullScreen ? 'h-full' : ''}`}>
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
          <div className={`flex-1 rounded-xl border border-slate-800/80 bg-[#1e1f26] overflow-hidden ${isFullScreen ? 'min-h-[calc(100vh-200px)]' : 'min-h-[400px]'}`}>
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
          <div className={`flex-1 overflow-y-auto rounded-xl border border-slate-800/80 bg-slate-950/80 p-4 font-mono ${isFullScreen ? 'min-h-[calc(100vh-200px)]' : 'min-h-[400px]'}`}>
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

