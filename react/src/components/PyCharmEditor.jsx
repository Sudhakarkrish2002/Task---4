import { useEffect, useMemo } from 'react';
import Editor from '@monaco-editor/react';

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

const themeRules = [
  { token: '', foreground: 'CED1F2', background: '1E1F26' },
  { token: 'comment', foreground: '5C6370' },
  { token: 'string', foreground: '98C379' },
  { token: 'keyword', foreground: 'C678DD' },
  { token: 'number', foreground: 'D19A66' },
  { token: 'type', foreground: '61AFEF' },
  { token: 'function', foreground: '56B6C2' },
  { token: 'variable', foreground: 'E5C07B' },
];

function PyCharmEditor({ value = defaultCode, onChange, fullScreen = false, onExit }) {
  const computedTheme = useMemo(() => themeRules, []);

  useEffect(() => {
    if (!fullScreen || typeof document === 'undefined') {
      return undefined;
    }

    const { documentElement, body } = document;
    const previousHtmlOverflow = documentElement.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    documentElement.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    return () => {
      documentElement.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [fullScreen]);

  const handleBeforeMount = (monaco) => {
    monaco.editor.defineTheme('pycharm-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: computedTheme,
      colors: {
        'editor.background': '#1E1F26',
        'editorGutter.background': '#171821',
        'editor.lineHighlightBackground': '#2A2B35',
        'editorLineNumber.foreground': '#4A4D62',
        'editorLineNumber.activeForeground': '#9DA1C4',
        'editor.selectionBackground': '#2C3652',
        'editor.selectionHighlightBackground': '#2C365255',
        'editorIndentGuide.background': '#2B2D3A',
        'scrollbarSlider.background': '#3A3D4A88',
        'scrollbarSlider.hoverBackground': '#4C5064AA',
        'editorCursor.foreground': '#FFCC00',
      },
    });
  };

  const handleMount = (editorInstance, monaco) => {
    monaco.editor.setTheme('pycharm-dark');
    editorInstance.focus();
  };

  const wrapperClassName = fullScreen
    ? 'fixed inset-0 z-60 flex flex-col bg-[#1e1f26]'
    : 'flex flex-col overflow-hidden rounded-xl border border-slate-800/80 bg-[#1e1f26] shadow-inner shadow-slate-950/40';

  const headerClassName = fullScreen
    ? 'flex items-center justify-between border-b border-slate-800/70 px-6 py-4 text-xs uppercase tracking-wide text-slate-400'
    : 'flex items-center justify-between border-b border-slate-800/70 px-4 py-3 text-xs uppercase tracking-wide text-slate-400';

  const editorContainerClassName = fullScreen ? 'flex-1' : 'flex-1 min-h-0';
  const editorHeight = fullScreen ? '100%' : '100%';

  return (
    <div className={wrapperClassName}>
      <div className={headerClassName}>
        <div className="flex items-center gap-4">
          <span className="flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </span>
          <div className="flex items-center gap-2 text-[11px] font-semibold">
            <span className="rounded-md bg-slate-800/80 px-3 py-1 text-emerald-200">code.py</span>
            <span className="rounded-md px-3 py-1 text-slate-500">config.yml</span>
            <span className="rounded-md px-3 py-1 text-slate-500">README.md</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-semibold text-slate-500">
            {fullScreen ? 'PyCharm Mode — Full Screen' : 'PyCharm Mode'}
          </span>
          {fullScreen && onExit && (
            <button
              type="button"
              onClick={onExit}
              className="inline-flex items-center rounded-full border border-slate-700/60 px-4 py-1.5 text-[11px] font-semibold text-slate-200 transition hover:border-slate-500/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
              aria-label="Exit full-screen editor (Esc)"
            >
              Exit
            </button>
          )}
        </div>
      </div>
      <div className={editorContainerClassName}>
        <Editor
          height={editorHeight}
          defaultLanguage="python"
          value={value}
          theme="vs-dark"
          options={editorOptions}
          beforeMount={handleBeforeMount}
          onMount={handleMount}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default PyCharmEditor;


