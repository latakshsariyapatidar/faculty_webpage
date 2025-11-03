/**
 * Main Application Component
 * 
 * Root component that orchestrates the entire faculty webpage.
 * Uses custom hooks for data fetching and navigation management.
 * 
 * @module App
 */

import React from 'react';
import { useFacultyData, useTabNavigation } from './hooks';
import { renderPage } from './utils/pageRenderer';
import PageLayout from './components/Layout/PageLayout';
import LoadingSpinner from './components/UI/LoadingSpinner';
import ErrorMessage from './components/UI/ErrorMessage';

/**
 * Main App component
 * 
 * Handles:
 * - Faculty data fetching with loading/error states
 * - Tab navigation with URL synchronization
 * - Page rendering based on active tab
 * - Layout structure
 * 
 * @param {Object} props
 * @param {string} props.facultyId - Required faculty ID from URL params
 * @returns {JSX.Element}
 */
function App({ facultyId }) {
  // Fetch faculty data with built-in loading and error handling
  const { data: facultyData, loading, error, refetch } = useFacultyData(facultyId);
  
  // Manage tab navigation with URL sync
  const { activeTab, setActiveTab } = useTabNavigation('home');

  // Show error if no facultyId provided
  if (!facultyId) {
    return (
      <ErrorMessage 
        title="Invalid URL"
        message="Please access the page with a valid faculty ID (e.g., /faculty123)"
        onRetry={null}
      />
    );
  }

  // Loading state
  if (loading) {
    return <LoadingSpinner message="Loading faculty information..." />;
  }

  // Error state with retry option
  if (error) {
    return (
      <ErrorMessage 
        title="Failed to Load Data"
        message={error}
        onRetry={refetch}
      />
    );
  }

  // Main application render
  return (
    <PageLayout 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
    >
      {renderPage(activeTab, facultyData)}
    </PageLayout>
  );
}

export default App;