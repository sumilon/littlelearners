import { useState, useCallback } from 'react';
import { playClick } from '../utils/audioUtils';

/**
 * Custom hook for managing tabs in modules
 * Provides tab state and click handler with audio feedback
 * 
 * @param {string} initialTab - The initial active tab ID
 * @returns {Object} { activeTab, setActiveTab, handleTabChange }
 */
export const useTabs = (initialTab) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabChange = useCallback((tabId) => {
    playClick();
    setActiveTab(tabId);
  }, []);

  return { activeTab, setActiveTab, handleTabChange };
};
