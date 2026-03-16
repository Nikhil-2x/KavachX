import React from 'react';
import { Zap, Shield, MessageSquare } from 'lucide-react';

export default function Features() {
  const features = [
    {
      id: 1,
      title: 'Fast & Reliable',
      description: 'Lightning quick performance with 99.9% uptime guaranteed for all your needs.',
      icon: Zap
    },
    {
      id: 2,
      title: 'Easy to Use',
      description: 'Intuitive interface designed for everyone. No technical knowledge required to get started.',
      icon: Shield
    },
    {
      id: 3,
      title: '24/7 Support',
      description: 'Our dedicated support team is always here to help you succeed with your projects.',
      icon: MessageSquare
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our features
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to succeed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="p-8 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="mb-4 inline-block p-3 bg-gray-900 rounded-lg">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}