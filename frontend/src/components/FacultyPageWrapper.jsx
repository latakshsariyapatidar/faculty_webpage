/**
 * Faculty Page Wrapper Component
 * 
 * Wrapper component that extracts facultyID from URL params
 * and passes it to the main App component.
 * 
 * @module components/FacultyPageWrapper
 */

import React from 'react';
import { useParams } from 'react-router-dom';
import App from '../App';

/**
 * FacultyPageWrapper - Extracts facultyID from URL and renders App
 * 
 * @returns {JSX.Element} App component with facultyID
 */
const FacultyPageWrapper = () => {
  const { facultyId } = useParams();
  
  return <App facultyId={facultyId} />;
};

export default FacultyPageWrapper;
