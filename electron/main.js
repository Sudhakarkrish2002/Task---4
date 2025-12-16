const { app, BrowserWindow } = require('electron');
const path = require('path');

/**
 * Creates the main application window with platform-specific optimizations.
 * During development we expect Vite's dev server to be running on localhost:5173.
 * Once bundled, we will load the built index.html from the React output directory.
 */
const createWindow = () => {
  const isMac = process.platform === 'darwin';
  const isWindows = process.platform === 'win32';
  const isLinux = process.platform === 'linux';

  // Platform-specific window options
  const windowOptions = {
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 600,
    backgroundColor: '#0f172a', // slate-900
    show: false, // Don't show until ready
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      sandbox: false,
    },
  };

  // Platform-specific title bar styles
  if (isMac) {
    windowOptions.titleBarStyle = 'hiddenInset';
    windowOptions.vibrancy = 'dark';
  } else if (isWindows) {
    windowOptions.frame = true;
    windowOptions.titleBarStyle = 'default';
  } else if (isLinux) {
    windowOptions.frame = true;
    windowOptions.autoHideMenuBar = false;
  }

  const mainWindow = new BrowserWindow(windowOptions);

  // Show window when ready to prevent flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Focus window on creation
    if (isMac) {
      app.dock.show();
    }
    mainWindow.focus();
  });

  // Optimize font rendering per platform
  if (isWindows) {
    mainWindow.webContents.setZoomFactor(1.0);
    // Better font rendering on Windows
    mainWindow.webContents.insertCSS(`
      * {
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
      }
    `);
  } else if (isMac) {
    mainWindow.webContents.setZoomFactor(1.0);
    // Better font rendering on macOS
    mainWindow.webContents.insertCSS(`
      * {
        -webkit-font-smoothing: subpixel-antialiased;
        text-rendering: optimizeLegibility;
      }
    `);
  } else if (isLinux) {
    mainWindow.webContents.setZoomFactor(1.0);
    // Better font rendering on Linux
    mainWindow.webContents.insertCSS(`
      * {
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
      }
    `);
  }

  const devServerURL = process.env.VITE_DEV_SERVER_URL;

  if (devServerURL) {
    mainWindow.loadURL(devServerURL);
    // Only open dev tools in development
    if (process.env.NODE_ENV === 'development') {
      mainWindow.webContents.openDevTools({ mode: 'detach' });
    }
  } else {
    const distPath = path.join(__dirname, '..', 'react', 'dist', 'index.html');
    mainWindow.loadFile(distPath);
  }

  // Handle window closed
  mainWindow.on('closed', () => {
    // Dereference the window object
  });

  return mainWindow;
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

