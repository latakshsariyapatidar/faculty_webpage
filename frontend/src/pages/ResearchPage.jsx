/**
 * Research Page Component
 * 
 * Displays research interests, student positions available,
 * requirements, and application information.
 * 
 * @module pages/ResearchPage
 */

import React from 'react';

/**
 * Research page component
 * 
 * @param {Object} props
 * @param {Object} props.data - Research data
 * @param {Array} props.data.interests - Research interests list
 * @param {Object} props.data.fundingInfo - Student position information
 * @returns {JSX.Element}
 */
function ResearchPage({ data }) {
  return (
    <div className="w-full space-y-8">
      {/* Research Interests */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Research Interests</h2>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="grid md:grid-cols-2 gap-3">
            {data.interests.map((interest, i) => (
              <div 
                key={i} 
                className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded bg-primary flex items-center justify-center text-white font-medium text-xs">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-700 leading-relaxed flex-1">{interest}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Positions */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Student Positions</h2>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          {/* Positions Available */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-5 rounded-lg bg-gray-50 border-l-4 border-primary">
              <h3 className="text-base font-semibold text-gray-900 mb-2">PhD Positions</h3>
              <p className="text-2xl font-bold text-primary">
                {data.fundingInfo.phdPositions}
              </p>
            </div>
            
            <div className="p-5 rounded-lg bg-gray-50 border-l-4 border-secondary">
              <h3 className="text-base font-semibold text-gray-900 mb-2">M.Tech Positions</h3>
              <p className="text-2xl font-bold text-secondary">
                {data.fundingInfo.mtechPositions}
              </p>
            </div>
          </div>
          
          {/* Requirements */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-gray-900 mb-3">Requirements</h3>
            <div className="space-y-2">
              {data.fundingInfo.requirements.map((req, i) => (
                <div 
                  key={i} 
                  className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white text-xs">
                    ✓
                  </span>
                  <span className="text-sm text-gray-700 leading-relaxed flex-1">{req}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Contact Note */}
          <div className="p-4 rounded-lg bg-orange-50 border-l-4 border-secondary">
            <p className="text-sm text-gray-700 leading-relaxed">{data.fundingInfo.note}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ResearchPage;