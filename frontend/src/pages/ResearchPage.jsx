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
// ResearchPage.jsx
function ResearchPage({ data }) {
  return (
    <div className="space-y-8">
      {/* Research Interests */}
      <section className="bg-white rounded-3xl shadow-lg border border-purple-200 p-8">
        <h2 className="text-2xl font-bold text-purple-900 mb-8 pb-3 border-b-2 border-amber-500 inline-block">
          Research Interests
        </h2>
        
        <div className="mt-6">
          <ul className="space-y-4">
            {data.interests.map((interest, i) => (
              <li key={i} className="flex gap-4 items-start group">
                <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-xl flex items-center justify-center font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {i + 1}
                </span>
                <span className="flex-1 text-purple-800 text-lg pt-2 leading-relaxed">{interest}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Student Positions */}
      <section className="bg-white rounded-3xl shadow-lg border border-purple-200 p-8">
        <h2 className="text-2xl font-bold text-purple-900 mb-8 pb-3 border-b-2 border-amber-500 inline-block">
          Student Positions
        </h2>
        
        <div className="space-y-8 mt-6">
          {/* Positions Available */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-300 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-3">
                <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
                PhD Positions
              </h3>
              <p className="text-4xl font-bold text-purple-600">{data.fundingInfo.phdPositions}</p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-300 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-3">
                <span className="w-3 h-3 bg-purple-600 rounded-full"></span>
                M.Tech Positions
              </h3>
              <p className="text-4xl font-bold text-amber-600">{data.fundingInfo.mtechPositions}</p>
            </div>
          </div>
          
          {/* Requirements */}
          <div className="bg-gradient-to-br from-purple-50 to-amber-50/30 rounded-2xl p-6 border border-purple-200">
            <h3 className="text-xl font-bold text-purple-900 mb-6">Requirements</h3>
            <div className="space-y-4">
              {data.fundingInfo.requirements.map((req, i) => (
                <div key={i} className="flex gap-4 items-start bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 group">
                  <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow group-hover:scale-110 transition-transform duration-300">
                    ✓
                  </span>
                  <span className="flex-1 text-purple-800 leading-relaxed">{req}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Contact Note */}
          <div className="bg-gradient-to-r from-amber-100 to-purple-100 border-l-4 border-amber-500 rounded-2xl p-6 shadow-lg">
            <p className="text-purple-800 font-medium leading-relaxed">{data.fundingInfo.note}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
export default ResearchPage;