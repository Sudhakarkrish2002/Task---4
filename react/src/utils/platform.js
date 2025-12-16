/**
 * Platform detection utilities for cross-platform desktop app
 */

export const getPlatform = () => {
  if (typeof window === 'undefined') return 'unknown';
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  const platform = window.navigator.platform.toLowerCase();
  
  if (userAgent.includes('win') || platform.includes('win')) {
    return 'windows';
  }
  if (userAgent.includes('mac') || platform.includes('mac') || platform.includes('darwin')) {
    return 'mac';
  }
  if (userAgent.includes('linux') || platform.includes('linux')) {
    return 'linux';
  }
  
  return 'unknown';
};

export const isWindows = () => getPlatform() === 'windows';
export const isMac = () => getPlatform() === 'mac';
export const isLinux = () => getPlatform() === 'linux';

export const getModifierKey = () => {
  return isMac() ? '⌘' : 'Ctrl';
};

export const getShortcutKey = (key) => {
  const modifier = isMac() ? 'Meta' : 'Control';
  return `${modifier}+${key}`;
};

