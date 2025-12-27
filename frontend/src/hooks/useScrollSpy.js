// [file name]: useScrollSpy.js (FIXED VERSION)
import { useState, useEffect, useCallback, useRef } from 'react';

export const useScrollSpy = (sectionIds, offset = 100) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '');
  const timeoutRef = useRef(null);
  const lastScrollY = useRef(0);

  const getCurrentSection = useCallback(() => {
    if (sectionIds.length === 0) return '';

    let currentSection = sectionIds[0];
    let maxVisibleHeight = -1;

    for (const sectionId of sectionIds) {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate visible height of section
        const visibleTop = Math.max(rect.top, 0);
        const visibleBottom = Math.min(rect.bottom, windowHeight);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        
        // Calculate percentage of section visible
        const visiblePercentage = visibleHeight / windowHeight;
        
        // Section is considered "active" if:
        // 1. At least 40% of it is visible
        // 2. OR its top is within the offset range
        if (visiblePercentage > 0.4 || 
            (rect.top >= 0 && rect.top <= offset * 2)) {
          return sectionId; // Return immediately when we find a clearly visible section
        }
        
        // Track which section has the most visible area
        if (visibleHeight > maxVisibleHeight) {
          maxVisibleHeight = visibleHeight;
          currentSection = sectionId;
        }
      }
    }

    return currentSection;
  }, [sectionIds, offset]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const scrollDelta = Math.abs(currentY - lastScrollY.current);
      
      // Only update if user has scrolled at least 50px
      // This prevents rapid switching during small scrolls
      if (scrollDelta < 50 && lastScrollY.current !== 0) {
        return;
      }
      
      lastScrollY.current = currentY;

      // Clear any pending timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Debounce the scroll event
      timeoutRef.current = setTimeout(() => {
        const current = getCurrentSection();
        if (current && current !== activeSection) {
          setActiveSection(current);
          
          // Update URL hash
          if (window.history.replaceState) {
            const newHash = current === 'home' ? '' : `#${current}`;
            window.history.replaceState(null, '', window.location.pathname + newHash);
          }
        }
      }, 150); // 150ms debounce
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check after a delay to ensure DOM is ready
    const initialTimeout = setTimeout(() => {
      const current = getCurrentSection();
      if (current) {
        setActiveSection(current);
      }
    }, 300);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      clearTimeout(initialTimeout);
    };
  }, [getCurrentSection, activeSection]);

  return activeSection;
};