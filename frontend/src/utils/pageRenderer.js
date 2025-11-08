/**
 * Page Renderer Utility
 * 
 * Centralized logic for rendering the correct page component
 * based on the active tab. Makes it easy to add new pages.
 * 
 * @module utils/pageRenderer
 */

import HomePage from '../pages/HomePage';
import BiographyPage from '../pages/BiographyPage';
import CoursesPage from '../pages/CoursesPage';
import ResearchPage from '../pages/ResearchPage';
import PublicationsPage from '../pages/PublicationsPage';
import TalksPage from '../pages/TalksPage';
import StudentsPage from '../pages/StudentsPage';
import NewsPage from '../pages/NewsPage';
import GalleryPage from '../pages/GalleryPage';

/**
 * Page component mapping
 * Maps tab IDs to their corresponding page components and data paths
 */
const PAGE_CONFIG = {
  home: {
    component: HomePage,
    dataKey: null, // Uses full facultyData object
  },
  biography: {
    component: BiographyPage,
    dataKey: 'biography',
  },
  courses: {
    component: CoursesPage,
    dataKey: 'courses',
  },
  research: {
    component: ResearchPage,
    dataKey: 'research',
  },
  publications: {
    component: PublicationsPage,
    dataKey: 'publications',
  },
  talks: {
    component: TalksPage,
    dataKey: 'talks',
  },
  students: {
    component: StudentsPage,
    dataKey: 'students',
  },
  news: {
    component: NewsPage,
    dataKey: 'news',
  },
  gallery: {
    component: GalleryPage,
    dataKey: 'gallery',
  },
};

/**
 * Render the appropriate page component
 * 
 * @param {string} activeTab - Currently active tab ID
 * @param {Object} facultyData - Complete faculty data object
 * @returns {JSX.Element|null} Page component or null if tab is invalid
 * 
 * @example
 * const pageContent = renderPage('biography', facultyData);
 */
export const renderPage = (activeTab, facultyData) => {
  const config = PAGE_CONFIG[activeTab];
  
  if (!config) {
    console.warn(`No page configuration found for tab: ${activeTab}`);
    return null;
  }

  const PageComponent = config.component;
  const pageData = config.dataKey ? facultyData[config.dataKey] : facultyData;

  return <PageComponent data={pageData} />;
};

/**
 * Get page component for a given tab
 * 
 * @param {string} tabId - Tab identifier
 * @returns {React.Component|null} Page component
 */
export const getPageComponent = (tabId) => {
  const config = PAGE_CONFIG[tabId];
  return config ? config.component : null;
};

/**
 * Check if a tab has a valid page configuration
 * 
 * @param {string} tabId - Tab identifier
 * @returns {boolean} True if tab has a page configuration
 */
export const hasValidPage = (tabId) => {
  return PAGE_CONFIG.hasOwnProperty(tabId);
};
