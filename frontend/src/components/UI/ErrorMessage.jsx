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
// ErrorMessage.jsx
const ErrorMessage = ({ message, onRetry, title = 'Error' }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-amber-50/30 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-xl border border-purple-200 p-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          
            <h2 className="text-2xl font-bold text-purple-900 mb-3">
              {title}
            </h2>
          
            <p className="text-purple-700 mb-8 leading-relaxed">
              {message}
            </p>
          
            {onRetry && (
              <button onClick={onRetry} className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg shadow-purple-200/50 hover:shadow-xl hover:scale-105">
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ErrorMessage;
