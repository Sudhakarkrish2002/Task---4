const { contextBridge } = require('electron');

/**
 * Expose a limited, secure API surface to the renderer process.
 * Extend this bridge as features are implemented.
 */
contextBridge.exposeInMainWorld('electronAPI', {
  ping: () => 'pong',
});

