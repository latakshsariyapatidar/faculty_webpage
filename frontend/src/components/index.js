/**
 * Components Index
 * 
 * Central export point for all components.
 * Makes imports cleaner throughout the application.
 * 
 * @module components
 * @example
 * import { Header, Footer, LoadingSpinner } from '@/components';
 */

// Layout Components
export { default as PageLayout } from './Layout/PageLayout';

// Navigation Components
export { default as Navigation } from './Navigation/Navigation';

// Common Components
export { default as Header } from './Header';
export { default as Footer } from './Footer';

// UI Components
export { default as LoadingSpinner } from './UI/LoadingSpinner';
export { default as ErrorMessage } from './UI/ErrorMessage';
