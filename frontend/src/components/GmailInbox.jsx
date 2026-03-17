import React, { useState, useEffect } from 'react';
import { ArrowRight, RefreshCw, Eye, LogOut, Zap, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function GmailInbox({
  isAuthenticated,
  emails,
  loading,
  error,
  onConnect,
  onRefresh,
  onLogout,
  onStartWatch,
}) {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isWatching, setIsWatching] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleStartWatch = () => {
    setIsWatching(true);
    onStartWatch();
  };

  return (
    <section className={`relative min-h-screen overflow-hidden transition-colors duration-300 ${
      isDark
        ? 'bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950'
        : 'bg-gradient-to-br from-white via-gray-50 to-white'
    }`}>
      {/* Animated Background Blobs - Dark Mode Only */}
      {isDark && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-40 w-80 h-80 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-1/3 -right-40 w-80 h-80 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-r from-pink-600 to-pink-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
      )}

      {/* Grid Background - Dark Mode Only */}
      {isDark && (
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      )}

      {/* Gradient Overlay - Dark Mode Only */}
      {isDark && (
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent"></div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Badge - Animate In */}
        <div
          className={`flex justify-center mb-8 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className={`inline-flex items-center gap-2 px-4 py-2 backdrop-blur-md border rounded-full transition-all duration-300 cursor-pointer group ${
            isDark
              ? 'bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/40'
              : 'bg-gray-200 hover:bg-gray-300 border-gray-300 hover:border-gray-400'
          }`}>
            <Mail className={`w-4 h-4 animate-pulse ${isDark ? 'text-purple-300' : 'text-purple-600'}`} />
            <span className={`text-sm font-medium bg-clip-text text-transparent ${
              isDark
                ? 'bg-gradient-to-r from-purple-200 to-pink-200'
                : 'bg-gradient-to-r from-purple-600 to-pink-600'
            }`}>
              Real-time Email Monitoring
            </span>
            <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 ${isDark ? 'text-purple-300' : 'text-purple-600'}`} />
          </div>
        </div>

        {/* Main Heading - Animate In */}
        <div
          className={`text-center mb-6 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className={`block drop-shadow-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Your Gmail</span>
            <span className="block relative inline-block mt-2">
              {isDark && (
                <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-40 animate-pulse rounded-lg"></span>
              )}
              <span className={`relative bg-clip-text text-transparent drop-shadow-2xl transition-all duration-300 ${
                isDark
                  ? 'bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 hover:from-purple-200 hover:via-pink-200 hover:to-blue-200'
                  : 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-500 hover:via-pink-500 hover:to-blue-500'
              }`}>
                Inbox Reimagined
              </span>
            </span>
          </h1>
        </div>

        {/* Description - Animate In */}
        <div
          className={`max-w-2xl mx-auto mb-8 transition-all duration-1000 transform delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className={`text-lg md:text-xl mb-6 leading-relaxed drop-shadow-md text-center ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Monitor your emails in real-time. Get instant notifications as new messages arrive with our advanced polling system.
          </p>
          <div className={`flex flex-wrap justify-center gap-6 text-sm ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <div className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-300">
              <div className={`w-2 h-2 rounded-full animate-pulse ${isDark ? 'bg-purple-400' : 'bg-purple-600'}`}></div>
              <span>Real-time Updates</span>
            </div>
            <div className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-300">
              <div className={`w-2 h-2 rounded-full animate-pulse ${isDark ? 'bg-pink-400' : 'bg-pink-600'}`} style={{ animationDelay: '0.5s' }}></div>
              <span>Live Notifications</span>
            </div>
            <div className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-300">
              <div className={`w-2 h-2 rounded-full animate-pulse ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`} style={{ animationDelay: '1s' }}></div>
              <span>Always Connected</span>
            </div>
          </div>
        </div>

        {/* Error Alert - Animate In */}
        {error && (
          <div
            className={`max-w-2xl mx-auto mb-8 transition-all duration-500 transform ${
              error ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className={`p-4 backdrop-blur-md border rounded-xl flex items-start gap-3 transition-all duration-300 ${
              isDark
                ? 'bg-red-500/10 hover:bg-red-500/20 border-red-500/30 hover:border-red-500/50'
                : 'bg-red-100 hover:bg-red-200 border-red-300 hover:border-red-400'
            }`}>
              <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-red-400' : 'text-red-600'}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className={`font-semibold text-sm ${isDark ? 'text-red-300' : 'text-red-700'}`}>Error</h3>
                <p className={`text-sm ${isDark ? 'text-red-200' : 'text-red-600'}`}>{error}</p>
              </div>
            </div>
          </div>
        )}

        {!isAuthenticated ? (
          <>
            {/* CTA Button - Animate In */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 transform delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <button
                onClick={onConnect}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  Connect Gmail
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>

            {/* Empty State - Animate In */}
            <div
              className={`flex items-center justify-center min-h-96 transition-all duration-1000 transform delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="text-center max-w-md">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 border transition-colors duration-300 ${
                  isDark
                    ? 'bg-blue-500/20 border-blue-500/20 group hover:border-blue-500/50'
                    : 'bg-blue-100 border-blue-200 group hover:border-blue-300'
                }`}>
                  <Mail className={`w-10 h-10 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Connect Your Gmail</h2>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                  Start monitoring your inbox in real time. Connect your Gmail account to begin receiving instant email notifications.
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Action Buttons - Animate In */}
            <div
              className={`flex flex-wrap gap-3 justify-center mb-8 transition-all duration-1000 transform delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <button
                onClick={onRefresh}
                disabled={loading}
                className={`group relative px-6 py-3 font-semibold rounded-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 flex items-center gap-2 ${
                  isDark
                    ? 'bg-white/10 hover:bg-white/20 border border-white/20 hover:border-purple-500/50 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 border border-gray-300 hover:border-purple-400 text-gray-900'
                }`}
              >
                <RefreshCw className={`w-5 h-5 transition-transform duration-500 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>

              <button
                onClick={handleStartWatch}
                className={`group relative px-6 py-3 font-semibold rounded-lg backdrop-blur-md border transition-all duration-300 hover:-translate-y-1 active:translate-y-0 flex items-center gap-2 ${
                  isWatching
                    ? isDark
                      ? 'bg-green-500/20 border-green-500/50 text-green-300 hover:bg-green-500/30'
                      : 'bg-green-200 border-green-400 text-green-700 hover:bg-green-300'
                    : isDark
                    ? 'bg-white/10 hover:bg-white/20 border-white/20 hover:border-blue-500/50 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 border-gray-300 hover:border-blue-400 text-gray-900'
                }`}
              >
                <span className={`w-2 h-2 rounded-full transition-all ${isWatching ? (isDark ? 'bg-green-400' : 'bg-green-600') + ' animate-pulse' : (isDark ? 'bg-slate-400' : 'bg-gray-600')}`}></span>
                {isWatching ? 'Watching' : 'Start Watch'}
              </button>

              <button
                onClick={onLogout}
                className={`group relative px-6 py-3 font-semibold rounded-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 active:translate-y-0 flex items-center gap-2 ${
                  isDark
                    ? 'bg-white/10 hover:bg-red-500/20 border border-white/20 hover:border-red-500/50 text-white hover:text-red-300'
                    : 'bg-gray-200 hover:bg-red-200 border border-gray-300 hover:border-red-400 text-gray-900 hover:text-red-700'
                }`}
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>

            {/* Emails List - Animate In */}
            <div
              className={`transition-all duration-1000 transform delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-24 rounded-xl backdrop-blur-md animate-pulse ${
                        isDark
                          ? 'bg-white/5 border border-white/10'
                          : 'bg-gray-200 border border-gray-300'
                      }`}
                    ></div>
                  ))}
                </div>
              ) : emails.length === 0 ? (
                <div className="text-center py-16">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border ${
                    isDark
                      ? 'bg-white/5 border-white/10'
                      : 'bg-gray-200 border-gray-300'
                  }`}>
                    <Mail className={`w-8 h-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>No emails yet</h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Click "Refresh" to load the latest messages</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {emails.map((email, index) => (
                    <article
                      key={email.id}
                      onClick={() => setSelectedEmail(selectedEmail?.id === email.id ? null : email)}
                      className={`group relative rounded-xl p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg backdrop-blur-md overflow-hidden
                        ${selectedEmail?.id === email.id
                          ? isDark
                            ? 'ring-2 ring-purple-500/50 bg-white/10 border-purple-500/30'
                            : 'ring-2 ring-purple-400 bg-gray-200 border-purple-300'
                          : isDark
                          ? 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 hover:shadow-purple-500/20'
                          : 'bg-gray-100 hover:bg-gray-200 border border-gray-200 hover:border-purple-300 hover:shadow-purple-300/20'
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-500 translate-x-[-100%] group-hover:translate-x-[100%]"></div>

                      <div className="relative space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h3 className={`text-base sm:text-lg font-bold truncate group-hover:transition-colors ${
                              isDark
                                ? 'text-white group-hover:text-purple-300'
                                : 'text-gray-900 group-hover:text-purple-600'
                            }`}>
                              {email.subject || '(No Subject)'}
                            </h3>
                            <p className={`text-sm truncate ${
                              isDark
                                ? 'text-gray-400'
                                : 'text-gray-600'
                            }`}>
                              From: <span className={isDark ? 'text-gray-300' : 'text-gray-800'} className="font-medium">{email.from}</span>
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            <time className={`text-xs sm:text-sm whitespace-nowrap ${
                              isDark ? 'text-gray-500' : 'text-gray-600'
                            }`}>
                              {new Date(email.timestamp).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </time>
                          </div>
                        </div>

                        {selectedEmail?.id === email.id && (
                          <div className={`mt-4 pt-4 border-t space-y-3 animate-in slide-in-from-top-2 duration-300 ${
                            isDark
                              ? 'border-white/10'
                              : 'border-gray-300'
                          }`}>
                            <div className={`text-sm leading-relaxed max-h-48 overflow-y-auto ${
                              isDark ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {email.snippet || 'No preview available'}
                            </div>
                            <div className="flex gap-2 pt-2">
                              <button className={`text-xs px-3 py-2 rounded border transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-1 ${
                                isDark
                                  ? 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border-purple-500/30'
                                  : 'bg-purple-200 hover:bg-purple-300 text-purple-700 border-purple-400'
                              }`}>
                                <Eye className="w-4 h-4" />
                                Open in Gmail
                              </button>
                              <button className={`text-xs px-3 py-2 rounded border transition-all duration-300 hover:-translate-y-0.5 ${
                                isDark
                                  ? 'bg-white/10 hover:bg-white/20 text-gray-300 border-white/20'
                                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700 border-gray-400'
                              }`}>
                                Archive
                              </button>
                            </div>
                          </div>
                        )}

                        {!selectedEmail && (
                          <p className={`text-sm truncate ${
                            isDark
                              ? 'text-gray-400'
                              : 'text-gray-600'
                          }`}>
                            {email.snippet || 'No preview available'}
                          </p>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-in-from-top-2 {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-in {
          animation: slide-in-from-top-2 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}