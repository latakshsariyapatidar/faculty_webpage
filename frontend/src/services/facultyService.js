/**
 * Faculty Data Service
 * 
 * Service layer for fetching faculty data from the backend API.
 * Handles all API calls, error handling, and data transformation.
 * 
 * @module services/facultyService
 */

import axios from 'axios';
import { API_ENDPOINTS, API_TIMEOUT, API_ERROR_MESSAGES } from '../constants/apiConfig';

/**
 * Configure axios instance with defaults
 */
const apiClient = axios.create({
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch all faculty data from the backend
 * 
 * @returns {Promise<Array>} Array of faculty data objects
 * @throws {Error} When the API request fails
 */
export const fetchAllFacultyData = async () => {
  try {
    // Request without facultyId to get all faculty
    const response = await apiClient.get(API_ENDPOINTS.FACULTY_DATA);
    const data = response.data;
    
    // Ensure we always return an array
    if (Array.isArray(data)) {
      return data;
    } else {
      // If single object, wrap in array
      return [data];
    }
  } catch (error) {
    // Handle different error types
    if (error.response) {
      throw new Error(`${API_ERROR_MESSAGES.SERVER_ERROR} (${error.response.status})`);
    } else if (error.request) {
      throw new Error(API_ERROR_MESSAGES.NETWORK_ERROR);
    } else if (error.code === 'ECONNABORTED') {
      throw new Error(API_ERROR_MESSAGES.TIMEOUT_ERROR);
    } else {
      throw new Error(API_ERROR_MESSAGES.GENERIC_ERROR);
    }
  }
};

/**
 * Fetch faculty data from the backend by facultyID
 * Backend will pull fresh data from Google Sheets, update JSON, and return specific faculty
 * 
 * @param {string} facultyId - Required faculty ID to fetch specific faculty
 * @returns {Promise<Object>} Faculty data object
 * @throws {Error} When the API request fails or facultyID not found
 */
export const fetchFacultyData = async (facultyId) => {
  try {
    // facultyId is required
    if (!facultyId) {
      throw new Error('Faculty ID is required');
    }
    
    // Send facultyId as query parameter
    const response = await apiClient.get(`${API_ENDPOINTS.FACULTY_DATA}?facultyId=${encodeURIComponent(facultyId)}`);
    const data = response.data;
    
    // Backend returns single faculty object when facultyId is provided
    if (!data) {
      throw new Error('No faculty data received');
    }
    
    return data;
  } catch (error) {
    // Handle different error types
    if (error.response) {
      // Backend returned an error (404, 500, etc.)
      const errorMsg = error.response.data?.message || `Server error (${error.response.status})`;
      throw new Error(errorMsg);
    } else if (error.request) {
      throw new Error(API_ERROR_MESSAGES.NETWORK_ERROR);
    } else if (error.code === 'ECONNABORTED') {
      throw new Error(API_ERROR_MESSAGES.TIMEOUT_ERROR);
    } else {
      throw error; // Re-throw if it's our custom error
    }
  }
};

/**
 * Validate faculty data structure
 * 
 * @param {Object} data - Faculty data object
 * @returns {boolean} True if data is valid
 */
export const validateFacultyData = (data) => {
  const requiredFields = [
    'personalInfo',
    'about',
    'biography',
    'courses',
    'research',
    'publications',
    'talks',
    'students'
  ];

  return requiredFields.every(field => data && data.hasOwnProperty(field));
};
