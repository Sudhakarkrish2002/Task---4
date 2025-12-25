const { contextBridge, ipcRenderer } = require('electron');

/**
 * Expose a limited, secure API surface to the renderer process.
 * Extend this bridge as features are implemented.
 */
contextBridge.exposeInMainWorld('electronAPI', {
  ping: () => 'pong',
  
  // Python execution
  executePython: (code) => ipcRenderer.invoke('python:execute', code),
  
  // Python version check
  checkPythonVersion: () => ipcRenderer.invoke('python:checkVersion'),
  
  // Package installation
  installPackage: (packageName) => ipcRenderer.invoke('python:installPackage', packageName),
  
  // Check if package is installed
  checkPackage: (packageName) => ipcRenderer.invoke('python:checkPackage', packageName),
  
  // Event listeners for real-time output
  onPythonOutput: (callback) => {
    ipcRenderer.on('python:output', (event, data) => callback(data));
  },
  
  onPythonComplete: (callback) => {
    ipcRenderer.on('python:complete', (event, data) => callback(data));
  },
  
  onPythonError: (callback) => {
    ipcRenderer.on('python:error', (event, data) => callback(data));
  },
  
  onPipOutput: (callback) => {
    ipcRenderer.on('pip:output', (event, data) => callback(data));
  },
  
  // Remove event listeners
  removePythonOutputListener: () => {
    ipcRenderer.removeAllListeners('python:output');
  },
  
  removePythonCompleteListener: () => {
    ipcRenderer.removeAllListeners('python:complete');
  },
  
  removePythonErrorListener: () => {
    ipcRenderer.removeAllListeners('python:error');
  },
  
  removePipOutputListener: () => {
    ipcRenderer.removeAllListeners('pip:output');
  },
});

