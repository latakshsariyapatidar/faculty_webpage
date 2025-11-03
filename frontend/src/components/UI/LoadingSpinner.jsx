/**
 * Loading Spinner Component
 * 
 * Displays a loading state with optional message.
 * 
 * @module components/UI/LoadingSpinner
 */

import React from 'react';

/**
 * Loading spinner component
 * 
 * @param {Object} props
 * @param {string} [props.message='Loading...'] - Loading message
 * @param {string} [props.size='large'] - Size variant: 'small', 'medium', 'large'
 * @returns {JSX.Element}
 */
const LoadingSpinner = ({ message = 'Loading...', size = 'large' }) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-10 w-10',
    large: 'h-16 w-16'
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen"
      role="status"
      aria-live="polite"
    >
      <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-primary rounded-full animate-spin`}></div>
      <p className={`mt-4 ${textSizeClasses[size]} text-gray-600 font-medium`}>
        {message}
      </p>
    </div>
  );
};

export default LoadingSpinner;
