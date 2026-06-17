import { useEffect } from 'react';
import { cancelSpeech } from '../utils/speechUtils';

/**
 * Custom hook for cleaning up speech synthesis when component unmounts
 * Used across all modules to prevent speech from continuing after navigation
 * 
 * @param {Array} dependencies - Dependencies that trigger cleanup (e.g., [activeTab])
 */
export const useSpeechCleanup = (dependencies = []) => {
  useEffect(() => {
    return () => {
      cancelSpeech();
    };
  }, dependencies);
};
