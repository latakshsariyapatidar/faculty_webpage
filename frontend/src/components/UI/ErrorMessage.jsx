/**
 * Error Message Component
 * 
 * Displays error messages with optional retry functionality.
 * 
 * @module components/UI/ErrorMessage
 */

import React from 'react';

/**
 * Error message component
 * 
 * @param {Object} props
 * @param {string} props.message - Error message to display
 * @param {Function} [props.onRetry] - Optional retry callback
 * @param {string} [props.title='Error'] - Error title
 * @returns {JSX.Element}
 */
const ErrorMessage = ({ message, onRetry, title = 'Error' }) => {
  return (
    <div 
      className="flex items-center justify-center min-h-screen px-4"
      role="alert"
      aria-live="assertive"
    >
      <div className="bg-white rounded-lg border-2 border-red-200 p-8 max-w-md w-full">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg 
              className="w-8 h-8 text-red-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {title}
          </h2>
          
          <p className="text-gray-600 mb-6">
            {message}
          </p>
          
          {onRetry && (
            <button
              onClick={onRetry}
              className="bg-primary hover:bg-primary-dark text-white font-medium px-6 py-2 rounded transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
