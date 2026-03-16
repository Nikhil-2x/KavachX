import React from 'react';
import { LogOut } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, isAuthenticated, user, onLogout, onLoginClick }) {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'about', label: 'About' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">KavachX</h1>
          </div>

          {/* Navigation */}
          <nav className="flex gap-8 items-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative text-base font-medium transition-colors pb-1 ${
                  activeTab === tab.id
                    ? 'text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                )}
              </button>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3">
                  {user?.picture && (
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {user?.name || 'User'}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={onLoginClick}
                className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}