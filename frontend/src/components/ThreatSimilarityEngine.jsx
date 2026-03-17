// src/components/ThreatSimilarityEngine.jsx
import React, { useState } from 'react';
import { Zap, Loader, AlertCircle, TrendingUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThreatSimilarityEngine() {
  const { isDark } = useTheme();
  
  const [threatText, setThreatText] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const searchSimilarThreats = async (e) => {
    e.preventDefault();
    
    if (!threatText.trim()) {
      setError('Please enter threat information');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // Replace with your actual API endpoint
      const response = await fetch('YOUR_THREAT_SIMILARITY_API', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ threat: threatText })
      });

      if (!response.ok) {
        throw new Error('Failed to search similar threats');
      }

      const data = await response.json();
      setResults({
        totalFound: data.total_found || Math.floor(Math.random() * 50) + 5,
        topMatches: data.top_matches || [
          {
            similarity: (Math.random() * 30 + 70).toFixed(1),
            description: 'Phishing Campaign - Financial Institution Impersonation',
            date: '2024-03-10',
            affectedUsers: Math.floor(Math.random() * 5000) + 100,
            ttps: ['Spear Phishing', 'Credential Harvesting', 'Social Engineering']
          },
          {
            similarity: (Math.random() * 30 + 60).toFixed(1),
            description: 'Email-based Malware Distribution',
            date: '2024-02-28',
            affectedUsers: Math.floor(Math.random() * 3000) + 50,
            ttps: ['Malware', 'Trojan', 'Email Attachment']
          },
          {
            similarity: (Math.random() * 20 + 55).toFixed(1),
            description: 'Business Email Compromise Attempt',
            date: '2024-02-15',
            affectedUsers: Math.floor(Math.random() * 2000) + 20,
            ttps: ['Account Compromise', 'Impersonation', 'Fund Transfer']
          }
        ]
      });
    } catch (err) {
      // Demo fallback
      setResults({
        totalFound: Math.floor(Math.random() * 50) + 5,
        topMatches: [
          {
            similarity: (Math.random() * 30 + 70).toFixed(1),
            description: 'Phishing Campaign - Financial Institution Impersonation',
            date: '2024-03-10',
            affectedUsers: Math.floor(Math.random() * 5000) + 100,
            ttps: ['Spear Phishing', 'Credential Harvesting', 'Social Engineering']
          },
          {
            similarity: (Math.random() * 30 + 60).toFixed(1),
            description: 'Email-based Malware Distribution',
            date: '2024-02-28',
            affectedUsers: Math.floor(Math.random() * 3000) + 50,
            ttps: ['Malware', 'Trojan', 'Email Attachment']
          },
          {
            similarity: (Math.random() * 20 + 55).toFixed(1),
            description: 'Business Email Compromise Attempt',
            date: '2024-02-15',
            affectedUsers: Math.floor(Math.random() * 2000) + 20,
            ttps: ['Account Compromise', 'Impersonation', 'Fund Transfer']
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-10 ${
          isDark ? 'bg-yellow-600' : 'bg-yellow-400'
        }`}></div>
        <div className={`absolute top-1/3 right-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-10 ${
          isDark ? 'bg-orange-600' : 'bg-orange-400'
        }`}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className={`p-4 rounded-lg ${
              isDark ? 'bg-yellow-500/20' : 'bg-yellow-100'
            }`}>
              <Zap className={`w-8 h-8 ${
                isDark ? 'text-yellow-400' : 'text-yellow-600'
              }`} />
            </div>
          </div>
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r ${
            isDark
              ? 'from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent'
              : 'from-yellow-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent'
          }`}>
            Threat Similarity Engine
          </h1>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Compare threats against our database of known attacks and identify similar patterns
          </p>
        </div>

        {/* Analysis Card */}
        <div className={`rounded-2xl border transition-all duration-300 p-8 mb-8 ${
          isDark
            ? 'bg-white/5 border-white/10 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/20'
            : 'bg-gray-100 border-gray-200 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/20'
        }`}>
          
          {/* Input Form */}
          <form onSubmit={searchSimilarThreats} className="space-y-4">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Describe the Threat or Attack
              </label>
              <textarea
                placeholder="Enter details about the threat you want to compare against our database..."
                value={threatText}
                onChange={(e) => setThreatText(e.target.value)}
                rows={6}
                className={`w-full px-4 py-3 rounded-lg transition-all duration-300 resize-none ${
                  isDark
                    ? 'bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-yellow-500 focus:bg-white/20 focus:outline-none'
                    : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-yellow-500 focus:bg-white focus:outline-none'
                }`}
              />
              <div className={`mt-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {threatText.length}/5000 characters
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !threatText.trim()}
              className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                loading || !threatText.trim()
                  ? isDark
                    ? 'bg-yellow-500/30 text-gray-400 cursor-not-allowed'
                    : 'bg-yellow-100 text-gray-400 cursor-not-allowed'
                  : isDark
                    ? 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white hover:shadow-lg hover:shadow-yellow-500/50'
                    : 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white hover:shadow-lg hover:shadow-yellow-500/50'
              }`}
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Searching Database...
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4" />
                  Find Similar Threats
                </>
              )}
            </button>

            {error && (
              <div className={`p-4 rounded-lg border ${
                isDark
                  ? 'bg-red-500/10 border-red-500/30 text-red-400'
                  : 'bg-red-50 border-red-300 text-red-600'
              }`}>
                {error}
              </div>
            )}
          </form>

          {/* Results Display */}
          {results && (
            <div className="mt-8 space-y-6 border-t pt-8" style={{
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
            }}>
              
              {/* Summary */}
              <div className={`p-6 rounded-lg ${
                isDark ? 'bg-white/5' : 'bg-gray-200/50'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-semibold uppercase ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>Total Similar Threats Found</p>
                    <p className={`text-3xl font-bold mt-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>{results.totalFound}</p>
                  </div>
                  <TrendingUp className={`w-12 h-12 ${
                    isDark ? 'text-yellow-400' : 'text-yellow-600'
                  }`} />
                </div>
              </div>

              {/* Top Matches */}
              <div>
                <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Top Matching Threats
                </h3>
                <div className="space-y-4">
                  {results.topMatches && results.topMatches.map((match, idx) => (
                    <div
                      key={idx}
                      className={`p-6 rounded-lg border transition-all duration-300 cursor-pointer hover:border-opacity-100 ${
                        isDark
                          ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-yellow-500/30'
                          : 'bg-gray-200/50 border-gray-300 hover:bg-gray-200 hover:border-yellow-500/30'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {match.description}
                          </h4>
                          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Reported: {match.date}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className={`text-2xl font-bold ${
                            parseFloat(match.similarity) > 70
                              ? isDark ? 'text-red-400' : 'text-red-600'
                              : isDark ? 'text-yellow-400' : 'text-yellow-600'
                          }`}>
                            {match.similarity}%
                          </p>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Similar
                          </p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className={`grid grid-cols-2 gap-4 pb-4 mb-4 border-b ${
                        isDark ? 'border-white/10' : 'border-gray-300'
                      }`}>
                        <div>
                          <p className={`text-xs font-semibold uppercase ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}>Affected Users</p>
                          <p className={`text-lg font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {match.affectedUsers.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className={`text-xs font-semibold uppercase ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}>TTPs Used</p>
                          <p className={`text-sm font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {match.ttps.length} Techniques
                          </p>
                        </div>
                      </div>

                      {/* TTPs */}
                      <div>
                        <p className={`text-xs font-semibold uppercase mb-2 ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>Attack Techniques</p>
                        <div className="flex flex-wrap gap-2">
                          {match.ttps.map((ttp, i) => (
                            <span
                              key={i}
                              className={`text-xs px-3 py-1 rounded-full ${
                                isDark
                                  ? 'bg-yellow-500/20 text-yellow-300'
                                  : 'bg-yellow-200 text-yellow-800'
                              }`}
                            >
                              {ttp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className={`rounded-2xl border p-8 ${
          isDark
            ? 'bg-white/5 border-white/10'
            : 'bg-gray-100 border-gray-200'
        }`}>
          <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            📚 Understanding Threat Patterns
          </h3>
          <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <li>✓ Threat actors often reuse tactics and techniques across campaigns</li>
            <li>✓ Similar patterns can indicate coordinated attacks or copying of methods</li>
            <li>✓ Understanding historical threats helps predict future attacks</li>
            <li>✓ TTPs (Tactics, Techniques, Procedures) are key to threat analysis</li>
            <li>✓ Higher similarity scores indicate more likely related threat actors</li>
          </ul>
        </div>
      </div>
    </div>
  );
}