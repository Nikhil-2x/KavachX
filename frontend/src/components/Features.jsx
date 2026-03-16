import React from 'react';
import { Zap, Shield, MessageSquare } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Features() {
  const { isDark } = useTheme();

  const features = [
    {
      id: 1,
      title: 'Fast & Reliable',
      description: 'Lightning quick performance with 99.9% uptime guaranteed for all your needs.',
      icon: Zap,
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      id: 2,
      title: 'Easy to Use',
      description: 'Intuitive interface designed for everyone. No technical knowledge required to get started.',
      icon: Shield,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      title: '24/7 Support',
      description: 'Our dedicated support team is always here to help you succeed with your projects.',
      icon: MessageSquare,
      gradient: 'from-pink-500 to-purple-500'
    }
  ];

  return (
    <section className={`relative py-20 md:py-32 overflow-hidden transition-colors duration-300 ${
      isDark
        ? 'bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950'
        : 'bg-gradient-to-b from-white via-gray-50 to-white'
    }`}>
      {/* Background Blobs - Dark Mode Only */}
      {isDark && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className={`inline-block mb-4 px-4 py-2 backdrop-blur-md rounded-full transition-colors duration-300 ${
            isDark
              ? 'bg-white/10 border border-white/20'
              : 'bg-gray-200 border border-gray-300'
          }`}>
            <span className={`text-sm font-medium bg-clip-text text-transparent ${
              isDark
                ? 'bg-gradient-to-r from-purple-300 to-pink-300'
                : 'bg-gradient-to-r from-purple-600 to-pink-600'
            }`}>
              Our Capabilities
            </span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Powerful Features
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
            Everything you need to secure and streamline your digital presence
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className={`group relative p-8 rounded-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  isDark
                    ? 'bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 hover:shadow-purple-500/20'
                    : 'bg-gray-100 border border-gray-200 hover:border-gray-300 hover:bg-gray-200 hover:shadow-gray-500/20'
                }`}
                style={{
                  animation: `slideUp 0.6s ease-out ${index * 0.2}s both`,
                }}
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>

                {/* Icon Container */}
                <div className={`relative mb-6 w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className={`text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 group-hover:bg-clip-text transition-all duration-300 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {feature.title}
                  </h3>
                  <p className={`leading-relaxed transition-colors duration-300 ${
                    isDark
                      ? 'text-gray-400 group-hover:text-gray-300'
                      : 'text-gray-700 group-hover:text-gray-800'
                  }`}>
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Accent */}
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.gradient} rounded-full w-0 group-hover:w-full transition-all duration-300`}></div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}