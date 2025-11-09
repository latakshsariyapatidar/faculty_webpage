/**
 * Research Page Component
 * 
 * Displays research interests with images and descriptions,
 * student positions available with position-specific requirements.
 * 
 * @module pages/ResearchPage
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Mail } from 'lucide-react';

/**
 * Research page component
 * 
 * @param {Object} props
 * @param {Object} props.data - Research data
 * @param {Array} props.data.interests - Research interests list with images
 * @param {Object} props.data.fundingInfo - Student position information
 * @returns {JSX.Element}
 */
function ResearchPage({ data }) {
  const [selectedPosition, setSelectedPosition] = useState(null);

  // Get position-specific requirements
  const getRequirementsForPosition = (positionId) => {
    return data.fundingInfo.requirements
      .filter(req => req.position_id === positionId || !req.position_id)
      .map(req => typeof req === 'object' ? req.requirement : req);
  };

  // Get faculty email
  const facultyEmail = data?.facultyEmail || 'faculty@iitdh.ac.in';

  return (
    <div className="space-y-12">
      {/* Research Interests */}
      <section className="bg-white rounded-3xl shadow-lg border border-purple-200 p-8">
        <h2 className="text-3xl font-bold text-purple-900 mb-8 pb-4 border-b-4 border-amber-500 inline-block">
          Research Interests
        </h2>
        
        <div className="space-y-8 mt-6">
          {data.interests.map((interest, i) => {
            const title = typeof interest === 'object' ? interest.title : interest;
            const description = typeof interest === 'object' ? interest.description : '';
            const image = typeof interest === 'object' ? interest.image : '';

            return (
              <div key={i} className="group">
                {/* With Image and Description */}
                {(image || description) ? (
                  <div className="bg-gradient-to-br from-purple-50 to-amber-50 rounded-2xl p-6 border-2 border-purple-100 hover:border-amber-300 transition-all duration-300 shadow-md hover:shadow-xl">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Image */}
                      {image && (
                        <div className="md:w-1/3 shrink-0">
                          <img 
                            src={image} 
                            alt={title}
                            className="w-full h-48 object-cover rounded-xl shadow-lg border-2 border-white"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex gap-4 items-start">
                          <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-xl flex items-center justify-center font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                            {i + 1}
                          </span>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-purple-900 mb-3">{title}</h3>
                            {description && (
                              <p className="text-gray-700 leading-relaxed">{description}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Simple List Item */
                  <div className="flex gap-4 items-start bg-gradient-to-r from-purple-50 to-amber-50 p-5 rounded-xl border border-purple-100 hover:border-amber-300 transition-all duration-300">
                    <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-xl flex items-center justify-center font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {i + 1}
                    </span>
                    <span className="flex-1 text-purple-800 text-lg pt-2 leading-relaxed font-medium">{title}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Student Positions */}
      <section className="bg-white rounded-3xl shadow-lg border border-purple-200 p-8">
        <h2 className="text-3xl font-bold text-purple-900 mb-8 pb-4 border-b-4 border-amber-500 inline-block">
          Student Positions
        </h2>
        
        <div className="space-y-8 mt-6">
          {/* Positions Available */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-300 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-3">
                <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
                PhD Positions
              </h3>
              <p className="text-4xl font-bold text-purple-600">{data.fundingInfo.phdPositions || 0}</p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border-2 border-amber-300 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-3">
                <span className="w-3 h-3 bg-purple-600 rounded-full"></span>
                M.Tech Positions
              </h3>
              <p className="text-4xl font-bold text-amber-600">{data.fundingInfo.mtechPositions || 0}</p>
            </div>
          </div>
          
          {/* Position-Specific Requirements */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-purple-900">Position Requirements</h3>
            
            {/* PhD Requirements */}
            <div className="border-2 border-purple-200 rounded-2xl overflow-hidden">
              <button
                onClick={() => setSelectedPosition(selectedPosition === 'phd' ? null : 'phd')}
                className="w-full bg-gradient-to-r from-purple-100 to-purple-50 p-5 flex items-center justify-between hover:from-purple-200 hover:to-purple-100 transition-all duration-300"
              >
                <span className="text-lg font-bold text-purple-900">PhD Position Requirements</span>
                {selectedPosition === 'phd' ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
              
              {selectedPosition === 'phd' && (
                <div className="p-6 bg-white">
                  <div className="space-y-4">
                    {/* Requirements List */}
                    <div className="space-y-3">
                      {getRequirementsForPosition('phd').map((req, i) => (
                        <div key={i} className="flex gap-4 items-start bg-gradient-to-r from-purple-50 to-white p-4 rounded-xl shadow-sm border border-purple-100">
                          <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow">
                            ✓
                          </span>
                          <span className="flex-1 text-gray-800 leading-relaxed">{req}</span>
                        </div>
                      ))}
                    </div>

                    {/* Application Options - Always Show */}
                    <div className="mt-6 pt-6 border-t-2 border-purple-100">
                      <h4 className="text-lg font-bold text-purple-900 mb-4">How to Apply</h4>
                      
                      {/* Application Link Button (if available) */}
                      {data.fundingInfo.phd_application_link && (
                        <a
                          href={data.fundingInfo.phd_application_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl mb-3"
                        >
                          <ExternalLink size={20} />
                          Apply for PhD Position
                        </a>
                      )}

                      {/* Email Template (if available) */}
                      {data.fundingInfo.phd_email_template && (
                        <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500 mt-3">
                          <div className="flex items-start gap-3">
                            <Mail size={20} className="text-amber-600 mt-1 flex-shrink-0" />
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {data.fundingInfo.phd_email_template.replace('{faculty_email}', facultyEmail)}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Default Contact Info (if no specific application link/template) */}
                      {!data.fundingInfo.phd_application_link && !data.fundingInfo.phd_email_template && (
                        <div className="space-y-3">
                          {/* Email Contact Button */}
                          <a
                            href={`mailto:${facultyEmail}?subject=PhD Position Application`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                          >
                            <Mail size={20} />
                            Contact via Email: {facultyEmail}
                          </a>

                          {/* Application Note (if available) */}
                          {data.fundingInfo.note && (
                            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500 mt-3">
                              <p className="text-sm text-gray-700 leading-relaxed">
                                <strong>Application Instructions:</strong> {data.fundingInfo.note}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* M.Tech Requirements */}
            <div className="border-2 border-amber-200 rounded-2xl overflow-hidden">
              <button
                onClick={() => setSelectedPosition(selectedPosition === 'mtech' ? null : 'mtech')}
                className="w-full bg-gradient-to-r from-amber-100 to-amber-50 p-5 flex items-center justify-between hover:from-amber-200 hover:to-amber-100 transition-all duration-300"
              >
                <span className="text-lg font-bold text-purple-900">M.Tech Position Requirements</span>
                {selectedPosition === 'mtech' ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
              
              {selectedPosition === 'mtech' && (
                <div className="p-6 bg-white">
                  <div className="space-y-4">
                    {/* Requirements List */}
                    <div className="space-y-3">
                      {getRequirementsForPosition('mtech').map((req, i) => (
                        <div key={i} className="flex gap-4 items-start bg-gradient-to-r from-amber-50 to-white p-4 rounded-xl shadow-sm border border-amber-100">
                          <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow">
                            ✓
                          </span>
                          <span className="flex-1 text-gray-800 leading-relaxed">{req}</span>
                        </div>
                      ))}
                    </div>

                    {/* Application Options - Always Show */}
                    <div className="mt-6 pt-6 border-t-2 border-amber-100">
                      <h4 className="text-lg font-bold text-purple-900 mb-4">How to Apply</h4>
                      
                      {/* Application Link Button (if available) */}
                      {data.fundingInfo.mtech_application_link && (
                        <a
                          href={data.fundingInfo.mtech_application_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold rounded-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-200 shadow-lg hover:shadow-xl mb-3"
                        >
                          <ExternalLink size={20} />
                          Apply for M.Tech Position
                        </a>
                      )}

                      {/* Email Template (if available) */}
                      {data.fundingInfo.mtech_email_template && (
                        <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500 mt-3">
                          <div className="flex items-start gap-3">
                            <Mail size={20} className="text-purple-600 mt-1 flex-shrink-0" />
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {data.fundingInfo.mtech_email_template.replace('{faculty_email}', facultyEmail)}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Default Contact Info (if no specific application link/template) */}
                      {!data.fundingInfo.mtech_application_link && !data.fundingInfo.mtech_email_template && (
                        <div className="space-y-3">
                          {/* Email Contact Button */}
                          <a
                            href={`mailto:${facultyEmail}?subject=M.Tech Position Application`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold rounded-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                          >
                            <Mail size={20} />
                            Contact via Email: {facultyEmail}
                          </a>

                          {/* Application Note (if available) */}
                          {data.fundingInfo.note && (
                            <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500 mt-3">
                              <p className="text-sm text-gray-700 leading-relaxed">
                                <strong>Application Instructions:</strong> {data.fundingInfo.note}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* General Requirements (no position_id) */}
            {getRequirementsForPosition('').length > 0 && (
              <div className="bg-gradient-to-br from-purple-50 to-amber-50 rounded-2xl p-6 border-2 border-purple-200">
                <h4 className="text-lg font-bold text-purple-900 mb-4">General Requirements</h4>
                <div className="space-y-3">
                  {getRequirementsForPosition('').map((req, i) => (
                    <div key={i} className="flex gap-4 items-start bg-white p-4 rounded-xl shadow-sm border border-purple-100">
                      <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow">
                        ✓
                      </span>
                      <span className="flex-1 text-gray-800 leading-relaxed">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ResearchPage;