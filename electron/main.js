const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs').promises;
const os = require('os');

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

// Store active Python processes for cleanup
const activePythonProcesses = new Map();

// Helper function to find Python executable
const findPythonExecutable = async () => {
  const commands = process.platform === 'win32' ? ['python', 'python3'] : ['python3', 'python'];
  
  for (const cmd of commands) {
    try {
      const { execSync } = require('child_process');
      execSync(`${cmd} --version`, { stdio: 'ignore' });
      return cmd;
    } catch (error) {
      continue;
    }
  }
  return null;
};

// Helper function to check if pip is available
const checkPipAvailable = async (pythonCmd) => {
  try {
    const { execSync } = require('child_process');
    execSync(`${pythonCmd} -m pip --version`, { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
};

// IPC Handler: Check Python version
ipcMain.handle('python:checkVersion', async () => {
  try {
    const pythonCmd = await findPythonExecutable();
    if (!pythonCmd) {
      return { success: false, error: 'Python not found. Please install Python 3.11+ from python.org' };
    }

    return new Promise((resolve) => {
      const process = spawn(pythonCmd, ['--version']);
      let output = '';
      let errorOutput = '';

      process.stdout.on('data', (data) => {
        output += data.toString();
      });

      process.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      process.on('close', (code) => {
        const version = output.trim() || errorOutput.trim();
        resolve({
          success: code === 0,
          version: version || 'Unknown version',
          command: pythonCmd,
        });
      });

      process.on('error', (error) => {
        resolve({
          success: false,
          error: error.message,
        });
      });
    });
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// IPC Handler: Execute Python code
ipcMain.handle('python:execute', async (event, code) => {
  try {
    const pythonCmd = await findPythonExecutable();
    if (!pythonCmd) {
      return { success: false, error: 'Python not found. Please install Python 3.11+ from python.org' };
    }

    // Create temporary file for Python code
    const tempDir = os.tmpdir();
    const tempFile = path.join(tempDir, `robot_studio_${Date.now()}.py`);
    
    await fs.writeFile(tempFile, code, 'utf8');

    const processId = `python_${Date.now()}`;
    const pythonProcess = spawn(pythonCmd, [tempFile], {
      cwd: tempDir,
    });

    activePythonProcesses.set(processId, pythonProcess);

    let stdout = '';
    let stderr = '';
    let exitCode = null;

    pythonProcess.stdout.on('data', (data) => {
      const output = data.toString();
      stdout += output;
      // Send real-time output to renderer
      event.sender.send('python:output', { type: 'stdout', data: output });
    });

    pythonProcess.stderr.on('data', (data) => {
      const output = data.toString();
      stderr += output;
      // Send real-time error output to renderer
      event.sender.send('python:output', { type: 'stderr', data: output });
    });

    pythonProcess.on('close', async (code) => {
      exitCode = code;
      activePythonProcesses.delete(processId);
      
      // Clean up temporary file
      try {
        await fs.unlink(tempFile);
      } catch (error) {
        // Ignore cleanup errors
      }

      // Send completion event
      event.sender.send('python:complete', {
        exitCode,
        stdout,
        stderr,
      });
    });

    pythonProcess.on('error', async (error) => {
      activePythonProcesses.delete(processId);
      
      // Clean up temporary file
      try {
        await fs.unlink(tempFile);
      } catch (cleanupError) {
        // Ignore cleanup errors
      }

      event.sender.send('python:error', { error: error.message });
    });

    // Return process ID for potential cancellation
    return { success: true, processId };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// IPC Handler: Install Python package
ipcMain.handle('python:installPackage', async (event, packageName) => {
  try {
    const pythonCmd = await findPythonExecutable();
    if (!pythonCmd) {
      return { success: false, error: 'Python not found. Please install Python 3.11+ from python.org' };
    }

    const pipAvailable = await checkPipAvailable(pythonCmd);
    if (!pipAvailable) {
      return { success: false, error: 'pip not found. Please install pip for your Python installation.' };
    }

    // Sanitize package name (basic validation)
    const sanitizedPackage = packageName.trim().replace(/[^a-zA-Z0-9._-]/g, '');
    if (!sanitizedPackage) {
      return { success: false, error: 'Invalid package name' };
    }

    // Always use python -m pip for consistency
    const processId = `pip_${Date.now()}`;
    const pipProcess = spawn(pythonCmd, ['-m', 'pip', 'install', sanitizedPackage], {
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    activePythonProcesses.set(processId, pipProcess);

    let stdout = '';
    let stderr = '';

    pipProcess.stdout.on('data', (data) => {
      const output = data.toString();
      stdout += output;
      // Send real-time progress to renderer
      event.sender.send('pip:output', { type: 'stdout', data: output });
    });

    pipProcess.stderr.on('data', (data) => {
      const output = data.toString();
      stderr += output;
      // Send real-time progress to renderer
      event.sender.send('pip:output', { type: 'stderr', data: output });
    });

    return new Promise((resolve) => {
      pipProcess.on('close', (code) => {
        activePythonProcesses.delete(processId);
        
        if (code === 0) {
          resolve({
            success: true,
            message: `${sanitizedPackage} installed successfully`,
            stdout,
            stderr,
          });
        } else {
          resolve({
            success: false,
            error: `Installation failed: ${stderr || stdout}`,
            stdout,
            stderr,
          });
        }
      });

      pipProcess.on('error', (error) => {
        activePythonProcesses.delete(processId);
        resolve({
          success: false,
          error: error.message,
        });
      });
    });
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// IPC Handler: Check if package is installed
ipcMain.handle('python:checkPackage', async (event, packageName) => {
  try {
    const pythonCmd = await findPythonExecutable();
    if (!pythonCmd) {
      return { success: false, installed: false, error: 'Python not found' };
    }

    // Sanitize package name
    const sanitizedPackage = packageName.trim().replace(/[^a-zA-Z0-9._-]/g, '');
    if (!sanitizedPackage) {
      return { success: false, installed: false, error: 'Invalid package name' };
    }

    return new Promise((resolve) => {
      // Try to import the package
      const checkProcess = spawn(pythonCmd, ['-c', `import ${sanitizedPackage}`], {
        stdio: 'ignore',
      });

      checkProcess.on('close', (code) => {
        resolve({
          success: true,
          installed: code === 0,
          packageName: sanitizedPackage,
        });
      });

      checkProcess.on('error', (error) => {
        resolve({
          success: false,
          installed: false,
          error: error.message,
        });
      });
    });
  } catch (error) {
    return { success: false, installed: false, error: error.message };
  }
});

// Cleanup active processes on app quit
app.on('before-quit', () => {
  activePythonProcesses.forEach((process, processId) => {
    try {
      process.kill();
    } catch (error) {
      // Ignore errors during cleanup
    }
  });
  activePythonProcesses.clear();
});

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

