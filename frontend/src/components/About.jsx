import React from 'react';

export default function About() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            About us
          </h2>
          
          <div className="space-y-6">
            <p className="text-lg text-gray-600 leading-relaxed">
              We're a team of passionate builders and designers committed to creating the best experience for our users. Founded with a mission to simplify complexity, we've been helping thousands of users achieve their goals since day one.
            </p>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Our platform is built on the principles of simplicity, reliability, and user-first design. We believe in empowering people with tools that just work.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed">
              Whether you're just starting out or scaling to new heights, we're here to support your journey every step of the way. Join thousands of satisfied users who have already transformed their workflows with our platform.
            </p>
          </div>

          <div className="mt-12 pt-12 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Our values
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Innovation</h4>
                <p className="text-gray-600">Constantly pushing boundaries to deliver cutting-edge solutions.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Integrity</h4>
                <p className="text-gray-600">Building trust through transparency and ethical practices.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Impact</h4>
                <p className="text-gray-600">Making meaningful differences in our users' lives and work.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}