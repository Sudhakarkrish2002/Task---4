import { useState, useEffect } from 'react';
import { getPlatform, isWindows, isMac, isLinux, getModifierKey } from '../utils/platform';

export const usePlatform = () => {
  const [platform, setPlatform] = useState('unknown');
  const [modifierKey, setModifierKey] = useState('Ctrl');

  useEffect(() => {
    const currentPlatform = getPlatform();
    setPlatform(currentPlatform);
    setModifierKey(getModifierKey());
  }, []);

  return {
    platform,
    isWindows: isWindows(),
    isMac: isMac(),
    isLinux: isLinux(),
    modifierKey,
  };
};

