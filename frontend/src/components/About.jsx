import React from 'react';
import { Lightbulb, Heart, Zap } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Constantly pushing boundaries to deliver cutting-edge solutions.',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'Building trust through transparency and ethical practices.',
      gradient: 'from-pink-400 to-red-500'
    },
    {
      icon: Zap,
      title: 'Impact',
      description: 'Making meaningful differences in our users\' lives and work.',
      gradient: 'from-blue-400 to-cyan-500'
    }
  ];

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="max-w-3xl mx-auto mb-20">
          {/* Section Header */}
          <div className="mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
              <span className="text-sm font-medium bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                About KavachX
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Securing Your Digital Future
            </h2>
          </div>

          {/* Description Paragraphs */}
          <div className="space-y-6">
            <div className="group p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300">
              <p className="text-lg text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                We're a team of passionate builders and designers committed to creating the best experience for our users. Founded with a mission to simplify complexity, we've been helping thousands of users achieve their security goals since day one.
              </p>
            </div>

            <div className="group p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-pink-500/30 hover:bg-white/10 transition-all duration-300">
              <p className="text-lg text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                Our platform is built on the principles of simplicity, reliability, and user-first design. We believe in empowering people with tools that just work—no complexity, no compromise on security.
              </p>
            </div>

            <div className="group p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-500/30 hover:bg-white/10 transition-all duration-300">
              <p className="text-lg text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                Whether you're just starting out or scaling to enterprise levels, we're here to support your journey every step of the way. Join thousands of satisfied users who have transformed their security practices with KavachX.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Core Values
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="group relative p-8 rounded-2xl backdrop-blur-md border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
                  }}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>

                  {/* Icon */}
                  <div className={`relative mb-4 inline-block p-3 rounded-lg bg-gradient-to-br ${value.gradient} text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 group-hover:bg-clip-text transition-all duration-300">
                      {value.title}
                    </h4>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 p-8 md:p-12 rounded-2xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md border border-purple-500/30 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Join Us?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Be part of a community that's revolutionizing digital security
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:-translate-y-0.5">
            Get Started Today
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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