import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative py-20 md:py-40 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 overflow-hidden">
      {/* Animated Background Blobs - Pure Tailwind */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{ animation: 'blob 7s infinite' }}></div>
        <div className="absolute top-0 -right-40 w-80 h-80 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-20 w-80 h-80 bg-gradient-to-r from-pink-600 to-pink-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge - Animate In */}
        <div
          className={`flex justify-center mb-8 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 rounded-full transition-all duration-300 cursor-pointer group">
            <Sparkles className="w-4 h-4 text-purple-300 animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-sm font-medium bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
              Introducing KavachX - The Future of Security
            </span>
            <ArrowRight className="w-4 h-4 text-purple-300 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>

        {/* Main Heading - Animate In */}
        <div
          className={`text-center mb-8 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
            <span className="block text-white drop-shadow-lg">Protect Your</span>
            <span className="block relative inline-block mt-4">
              <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-40 animate-pulse rounded-lg"></span>
              <span className="relative bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent drop-shadow-2xl hover:from-purple-200 hover:via-pink-200 hover:to-blue-200 transition-all duration-300">
                Digital World
              </span>
            </span>
          </h1>
        </div>

        {/* Description - Animate In */}
        <div
          className={`max-w-2xl mx-auto mb-12 transition-all duration-1000 transform delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed drop-shadow-md">
            Enterprise-grade security meets elegant simplicity. Protect your business with cutting-edge encryption and real-time threat detection.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-300">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span>Military-grade encryption</span>
            </div>
            <div className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-300">
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span>24/7 Monitoring</span>
            </div>
            <div className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-300">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <span>99.9% Uptime</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons - Animate In */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 transform delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Primary Button */}
          <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:-translate-y-1 active:translate-y-0">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            <span className="relative flex items-center justify-center gap-2">
              <Zap className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>

          {/* Secondary Button */}
          <button className="group relative px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl backdrop-blur-md hover:bg-white/10 hover:border-white/60 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1 active:translate-y-0">
            <span className="flex items-center justify-center gap-2">
              Watch Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
        </div>

        {/* Features Grid - Animate In */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 transition-all duration-1000 transform delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            {
              icon: '🔐',
              title: 'End-to-End Encryption',
              description: 'Your data stays yours with industry-leading encryption standards'
            },
            {
              icon: '⚡',
              title: 'Lightning Fast',
              description: 'Sub-millisecond response times for critical security checks'
            },
            {
              icon: '🛡️',
              title: 'Always Protected',
              description: 'Real-time threat detection and instant response protocols'
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-purple-500/50 rounded-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer shadow-lg hover:shadow-xl hover:shadow-purple-500/20"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors duration-300">{feature.title}</h3>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Floating Stats - Animate In */}
        <div
          className={`flex flex-col md:flex-row justify-center gap-8 md:gap-12 transition-all duration-1000 transform delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { value: '10M+', label: 'Users Protected' },
            { value: '99.9%', label: 'Uptime' },
            { value: '150+', label: 'Countries' }
          ].map((stat, index) => (
            <div key={index} className="text-center group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:via-pink-300 group-hover:to-blue-300 transition-all duration-300">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 mt-2 group-hover:text-gray-300 transition-colors duration-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-gray-400 font-medium">Scroll to explore</span>
          <svg className="w-5 h-5 text-purple-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}