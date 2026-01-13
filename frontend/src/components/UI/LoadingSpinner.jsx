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
// LoadingSpinner.jsx
const LoadingSpinner = ({ message = 'Loading...', size = 'large' }) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-12 w-12',
    large: 'h-16 w-16'
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className={`${sizeClasses[size]} mx-auto mb-6 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin`}></div>
        <p className={`${textSizeClasses[size]} text-purple-700 font-medium`}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
