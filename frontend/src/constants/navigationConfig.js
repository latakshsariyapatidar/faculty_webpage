/**
 * Navigation Configuration
 * 
 * Centralized configuration for all navigation tabs.
 * Makes it easy to add/remove/reorder navigation items.
 * 
 * @module constants/navigationConfig
 */

import { Users, Briefcase, BookOpen, Award, FileText, Calendar, GraduationCap } from 'lucide-react';

export const NAVIGATION_TABS = [
  { 
    id: 'home', 
    label: 'Home', 
    icon: Users,
    ariaLabel: 'Navigate to home page'
  },
  { 
    id: 'biography', 
    label: 'Biography', 
    icon: Briefcase,
    ariaLabel: 'View professional biography'
  },
  { 
    id: 'courses', 
    label: 'Courses', 
    icon: BookOpen,
    ariaLabel: 'View courses taught'
  },
  { 
    id: 'research', 
    label: 'Research', 
    icon: Award,
    ariaLabel: 'View research interests and projects'
  },
  { 
    id: 'publications', 
    label: 'Publications', 
    icon: FileText,
    ariaLabel: 'View publications and patents'
  },
  { 
    id: 'talks', 
    label: 'Invited Talks', 
    icon: Calendar,
    ariaLabel: 'View invited talks and presentations'
  },
  { 
    id: 'students', 
    label: 'Students', 
    icon: GraduationCap,
    ariaLabel: 'View current and graduated students'
  }
];

/**
 * Get tab configuration by ID
 * @param {string} tabId - The tab identifier
 * @returns {Object|undefined} Tab configuration object
 */
export const getTabById = (tabId) => {
  return NAVIGATION_TABS.find(tab => tab.id === tabId);
};

/**
 * Get all tab IDs
 * @returns {string[]} Array of tab IDs
 */
export const getAllTabIds = () => {
  return NAVIGATION_TABS.map(tab => tab.id);
};
