import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import LoginPage from './components/LoginPage';


export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };


  const handleCloseModals = () => {
    setShowLoginModal(false);
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    handleCloseModals();
    // Store user data in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  // Check if user is logged in on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
        onLoginClick={handleLoginClick}
      />

      <main>
        {activeTab === 'home' && <Hero />}
        {activeTab === 'features' && <Features />}
        {activeTab === 'about' && <About />}
      </main>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginPage
          onClose={handleCloseModals}
          onGoogleSuccess={handleAuthSuccess}
        />
      )}

    </div>
  );
}