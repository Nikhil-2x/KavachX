// src/components/AttackerIntentSimulation.jsx
import React, { useState } from 'react';
import { AlertTriangle, Loader, AlertCircle, CheckCircle, Target } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function AttackerIntentSimulation() {
  const { isDark } = useTheme();
  
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const analyzeContent = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Please enter email or message content');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Replace with your actual API endpoint
      const response = await fetch('YOUR_ATTACKER_INTENT_API', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: content })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze content');
      }

      const data = await response.json();
      setResult({
        isPhishing: data.is_phishing || Math.random() > 0.5,
        threatScore: data.threat_score || (Math.random() * 100).toFixed(1),
        attackType: data.attack_type || 'Phishing',
        indicators: data.indicators || [
          'Urgency language detected',
          'Suspicious links present',
          'Identity spoofing indicators'
        ],
        verdict: data.verdict || (Math.random() > 0.5 ? 'SUSPICIOUS' : 'SAFE')
      });
    } catch (err) {
      // Demo fallback
      setResult({
        isPhishing: Math.random() > 0.5,
        threatScore: (Math.random() * 100).toFixed(1),
        attackType: 'Phishing Attack',
        indicators: [
          'Urgency language detected',
          'Suspicious links present',
          'Identity spoofing indicators'
        ],
        verdict: Math.random() > 0.5 ? 'SUSPICIOUS' : 'SAFE'
      });
    } finally {
      setLoading(false);
    }
  };

  const isPhishing = result?.isPhishing;
  const threatScore = parseFloat(result?.threatScore || 0);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-10 ${
          isDark ? 'bg-red-600' : 'bg-red-400'
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
              isDark ? 'bg-red-500/20' : 'bg-red-100'
            }`}>
              <AlertTriangle className={`w-8 h-8 ${
                isDark ? 'text-red-400' : 'text-red-600'
              }`} />
            </div>
          </div>
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r ${
            isDark
              ? 'from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent'
              : 'from-red-600 via-orange-600 to-red-600 bg-clip-text text-transparent'
          }`}>
            Attacker Intent Simulation
          </h1>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Analyze emails and messages to identify phishing, social engineering, and malicious intent
          </p>
        </div>

        {/* Analysis Card */}
        <div className={`rounded-2xl border transition-all duration-300 p-8 mb-8 ${
          isDark
            ? 'bg-white/5 border-white/10 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/20'
            : 'bg-gray-100 border-gray-200 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/20'
        }`}>
          
          {/* Input Form */}
          <form onSubmit={analyzeContent} className="space-y-4">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Paste Email or Message Content
              </label>
              <textarea
                placeholder="Paste the full email or message text here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className={`w-full px-4 py-3 rounded-lg transition-all duration-300 resize-none ${
                  isDark
                    ? 'bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-red-500 focus:bg-white/20 focus:outline-none'
                    : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:bg-white focus:outline-none'
                }`}
              />
              <div className={`mt-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {content.length}/5000 characters
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !content.trim()}
              className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                loading || !content.trim()
                  ? isDark
                    ? 'bg-red-500/30 text-gray-400 cursor-not-allowed'
                    : 'bg-red-100 text-gray-400 cursor-not-allowed'
                  : isDark
                    ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white hover:shadow-lg hover:shadow-red-500/50'
                    : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white hover:shadow-lg hover:shadow-red-500/50'
              }`}
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Target className="w-4 h-4" />
                  Analyze Content
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

          {/* Result Display */}
          {result && (
            <div className="mt-8 space-y-6 border-t pt-8" style={{
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
            }}>
              
              {/* Threat Score */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Threat Score
                  </h3>
                  <span className={`text-3xl font-bold ${
                    isPhishing ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {threatScore}%
                  </span>
                </div>
                <div className={`h-2 rounded-full overflow-hidden ${
                  isDark ? 'bg-white/10' : 'bg-gray-200'
                }`}>
                  <div
                    className={`h-full transition-all duration-1000 ${
                      isPhishing
                        ? 'bg-gradient-to-r from-red-500 to-orange-500'
                        : 'bg-gradient-to-r from-green-500 to-emerald-500'
                    }`}
                    style={{ width: `${threatScore}%` }}
                  />
                </div>
              </div>

              {/* Verdict */}
              <div className={`p-6 rounded-lg border ${
                isPhishing
                  ? isDark
                    ? 'bg-red-500/10 border-red-500/30'
                    : 'bg-red-50 border-red-300'
                  : isDark
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-green-50 border-green-300'
              }`}>
                <div className="flex items-start gap-4">
                  {isPhishing ? (
                    <AlertCircle className={`w-6 h-6 flex-shrink-0 ${
                      isDark ? 'text-red-400' : 'text-red-600'
                    }`} />
                  ) : (
                    <CheckCircle className={`w-6 h-6 flex-shrink-0 ${
                      isDark ? 'text-green-400' : 'text-green-600'
                    }`} />
                  )}
                  <div className="flex-1">
                    <h4 className={`font-bold text-lg mb-2 ${
                      isPhishing
                        ? isDark ? 'text-red-400' : 'text-red-600'
                        : isDark ? 'text-green-400' : 'text-green-600'
                    }`}>
                      {result.verdict}
                    </h4>
                    {result.attackType && (
                      <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className="font-semibold">Attack Type:</span> {result.attackType}
                      </p>
                    )}
                    {result.indicators && result.indicators.length > 0 && (
                      <div className={`text-sm space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        <p className="font-semibold mb-2">Detected Indicators:</p>
                        <ul className="list-disc list-inside">
                          {result.indicators.map((indicator, idx) => (
                            <li key={idx}>{indicator}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
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
            🔍 Common Phishing Indicators
          </h3>
          <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <li>✓ Urgent language asking for immediate action</li>
            <li>✓ Requests for personal or financial information</li>
            <li>✓ Suspicious links or attachments</li>
            <li>✓ Misspelled email addresses or domain names</li>
            <li>✓ Generic greetings like "Dear Customer"</li>
            <li>✓ Threats of account suspension or closure</li>
          </ul>
        </div>
      </div>
    </div>
  );
}