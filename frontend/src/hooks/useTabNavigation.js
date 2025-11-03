/**
 * Custom Hook: useTabNavigation
 * 
 * Manages tab navigation state with URL synchronization and validation.
 * Provides a centralized way to handle tab changes across the application.
 * 
 * @module hooks/useTabNavigation
 */

import { useState, useCallback, useEffect } from 'react';
import { getAllTabIds } from '../constants/navigationConfig';

/**
 * Custom hook for managing tab navigation
 * 
 * @param {string} defaultTab - Default tab to show
 * @returns {Object} Navigation state and handlers
 * @returns {string} state.activeTab - Currently active tab ID
 * @returns {Function} state.setActiveTab - Function to change active tab
 * @returns {Function} state.isTabActive - Function to check if a tab is active
 * 
 * @example
 * const { activeTab, setActiveTab, isTabActive } = useTabNavigation('home');
 * 
 * <button 
 *   onClick={() => setActiveTab('biography')}
 *   className={isTabActive('biography') ? 'active' : ''}
 * >
 *   Biography
 * </button>
 */
export const useTabNavigation = (defaultTab = 'home') => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  /**
   * Validate and set active tab
   * Only allows valid tab IDs from navigation config
   */
  const setValidatedTab = useCallback((tabId) => {
    const validTabs = getAllTabIds();
    
    if (validTabs.includes(tabId)) {
      setActiveTab(tabId);
      
      // Optional: Update URL without navigation (for bookmarking)
      if (window.history.replaceState) {
        window.history.replaceState(null, '', `#${tabId}`);
      }
    } else {
      console.warn(`Invalid tab ID: ${tabId}. Falling back to default.`);
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  /**
   * Check if a specific tab is currently active
   */
  const isTabActive = useCallback((tabId) => {
    return activeTab === tabId;
  }, [activeTab]);

  /**
   * Initialize from URL hash on mount
   */
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      setValidatedTab(hash);
    }
  }, [setValidatedTab]);

  return {
    activeTab,
    setActiveTab: setValidatedTab,
    isTabActive,
  };
};
