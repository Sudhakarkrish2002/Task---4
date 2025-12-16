import { contextBridge, ipcRenderer } from 'electron';

const api = {
  platform: () => ipcRenderer.invoke('robot:get-platform'),
  version: () => ipcRenderer.invoke('robot:get-version'),
  selectFirmwareFile: () => ipcRenderer.invoke('robot:select-firmware'),
  on: (channel, listener) => {
    const validChannels = ['robot:update-available'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, listener);
    }
  },
  once: (channel, listener) => {
    const validChannels = ['robot:update-available'];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, listener);
    }
  },
  removeListener: (channel, listener) => {
    ipcRenderer.removeListener(channel, listener);
  },
};

contextBridge.exposeInMainWorld('robotDesktop', api);

