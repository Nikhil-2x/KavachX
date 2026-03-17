import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ThreeDModel from './ThreeDModel';

export default function HeroWith3D() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedModel, setSelectedModel] = useState('shield'); // 'shield', 'cube', 'network'
  const { isDark } = useTheme();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className={`relative py-20 md:py-40 overflow-hidden transition-colors duration-300 ${
      isDark
        ? 'bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950'
        : 'bg-white'
    }`}>
      {/* Background Blobs - Dark Mode Only */}
      {isDark && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 -left-40 w-80 h-80 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-0 -right-40 w-80 h-80 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-8 left-20 w-80 h-80 bg-gradient-to-r from-pink-600 to-pink-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
      )}

      {/* Grid Background - Dark Mode Only */}
      {isDark && (
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      )}

      {/* Gradient Overlay - Dark Mode Only */}
      {isDark && (
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent"></div>
      )}

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge - Animate In */}
          <div
            className={`flex justify-center mb-8 transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 backdrop-blur-md rounded-full transition-all duration-300 cursor-pointer group ${
              isDark
                ? 'bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40'
                : 'bg-gray-100 hover:bg-gray-200 border border-gray-300 hover:border-gray-400'
            }`}>
              <Sparkles className={`w-4 h-4 animate-spin ${isDark ? 'text-purple-300' : 'text-purple-600'}`} style={{ animationDuration: '3s' }} />
              <span className={`text-sm font-medium bg-clip-text text-transparent ${
                isDark
                  ? 'bg-gradient-to-r from-purple-200 to-pink-200'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600'
              }`}>
                Introducing KavachX - The Future of Security
              </span>
              <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 ${isDark ? 'text-purple-300' : 'text-purple-600'}`} />
            </div>
          </div>

          {/* Main Content Grid - Text Left, 3D Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center mb-16">
            
            {/* Left Side - Content */}
            <div className={`transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {/* Main Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span className={`block drop-shadow-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Protect Your
                </span>
                <span className="block relative inline-block mt-4">
                  {isDark && (
                    <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-40 animate-pulse rounded-lg"></span>
                  )}
                  <span className={`relative bg-clip-text text-transparent drop-shadow-2xl transition-all duration-300 ${
                    isDark
                      ? 'bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 hover:from-purple-200 hover:via-pink-200 hover:to-blue-200'
                      : 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-500 hover:via-pink-500 hover:to-blue-500'
                  }`}>
                    Digital World
                  </span>
                </span>
              </h1>

              {/* Description */}
              <p className={`text-lg md:text-xl mb-6 leading-relaxed drop-shadow-md ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Enterprise-grade security meets elegant simplicity. Protect your business with cutting-edge encryption and real-time threat detection.
              </p>

              {/* Features List */}
              <div className={`flex flex-col gap-4 mb-8 text-sm ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <div className="flex items-center gap-3 hover:translate-x-1 transition-transform duration-300">
                  <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-purple-400' : 'bg-purple-600'}`}></div>
                  <span>Military-grade encryption</span>
                </div>
                <div className="flex items-center gap-3 hover:translate-x-1 transition-transform duration-300">
                  <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-pink-400' : 'bg-pink-600'}`}></div>
                  <span>24/7 Real-time monitoring</span>
                </div>
                <div className="flex items-center gap-3 hover:translate-x-1 transition-transform duration-300">
                  <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
                  <span>99.9% Uptime guarantee</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 transform delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                {/* Primary Button */}
                <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:-translate-y-1 active:translate-y-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    Get Started Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>

                {/* Secondary Button */}
                <button className={`group relative px-8 py-4 font-semibold rounded-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 active:translate-y-0 border-2 ${
                  isDark
                    ? 'border-white/30 text-white hover:bg-white/10 hover:border-white/60 hover:shadow-xl hover:shadow-blue-500/20'
                    : 'border-gray-300 text-gray-900 hover:bg-gray-100 hover:border-gray-400 hover:shadow-xl hover:shadow-gray-500/20'
                }`}>
                  <span className="flex items-center justify-center gap-2">
                    Watch Demo
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            </div>

            {/* Right Side - 3D Model */}
            <div className={`relative h-96 md:h-[500px] lg:h-[600px] transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } delay-300`}>
              {/* 3D Model Container */}
              <div className={`absolute inset-0 rounded-3xl overflow-hidden transition-all duration-300 ${
                isDark
                  ? 'bg-gradient-to-b from-purple-500/10 to-pink-500/10 border border-white/10'
                  : 'bg-gradient-to-b from-purple-100 to-pink-100 border border-gray-200'
              }`}>
                <ThreeDModel variant={selectedModel} />
              </div>

              {/* Model Selector - Bottom Controls */}
              <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2 p-3 rounded-full transition-all duration-300 ${
                isDark
                  ? 'bg-slate-900/80 border border-white/20 backdrop-blur-md'
                  : 'bg-white/80 border border-gray-300 backdrop-blur-md'
              }`}>
                {[
                  { id: 'shield', label: '🛡️', title: 'Shield' },
                  { id: 'cube', label: '📦', title: 'Cube' },
                  { id: 'network', label: '🌐', title: 'Network' }
                ].map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`group px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 text-sm font-medium ${
                      selectedModel === model.id
                        ? isDark
                          ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                          : 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                        : isDark
                          ? 'text-gray-300 hover:text-white hover:bg-white/10'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    title={model.title}
                  >
                    <span className="text-lg">{model.label}</span>
                    {selectedModel === model.id && (
                      <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-pink-400' : 'bg-pink-500'}`}></span>
                    )}
                  </button>
                ))}
              </div>

              {/* Glow Effect Behind 3D */}
              {isDark && (
                <div className="absolute inset-0 rounded-3xl opacity-30 pointer-events-none" style={{
                  background: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.3), transparent)'
                }}></div>
              )}
            </div>
          </div>

          {/* Stats Section */}
          <div className={`flex flex-col md:flex-row justify-center gap-8 md:gap-12 transition-all duration-1000 transform delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {[
              { value: '10M+', label: 'Users Protected' },
              { value: '99.9%', label: 'Uptime' },
              { value: '150+', label: 'Countries' }
            ].map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
                <div className={`text-3xl md:text-4xl font-bold bg-clip-text text-transparent transition-all duration-300 ${
                  isDark
                    ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 group-hover:from-purple-300 group-hover:via-pink-300 group-hover:to-blue-300'
                    : 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 group-hover:from-purple-500 group-hover:via-pink-500 group-hover:to-blue-500'
                }`}>
                  {stat.value}
                </div>
                <div className={`text-sm mt-2 transition-colors duration-300 ${
                  isDark
                    ? 'text-gray-400 group-hover:text-gray-300'
                    : 'text-gray-600 group-hover:text-gray-700'
                }`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Scroll to explore</span>
            <svg className={`w-5 h-5 animate-pulse ${isDark ? 'text-purple-400' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}