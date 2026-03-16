import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function RegisterPage({ onClose, onSwitchToLogin, onGoogleSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isDark } = useTheme();

  const handleGoogleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      const mockUser = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        picture: 'https://via.placeholder.com/40'
      };
      onGoogleSuccess(mockUser);
      setLoading(false);
    }, 1000);
  };

  const handleEmailRegister = (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const mockUser = {
        name: name,
        email: email,
        picture: 'https://via.placeholder.com/40'
      };
      onGoogleSuccess(mockUser);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className={`fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto transition-colors duration-300 ${
      isDark ? 'bg-black/60' : 'bg-black/40'
    }`}>
      <div className={`rounded-2xl shadow-2xl w-full max-w-md p-8 relative overflow-hidden my-8 transition-colors duration-300 border ${
        isDark
          ? 'bg-gradient-to-br from-slate-900 to-slate-800 border-white/10'
          : 'bg-white border-gray-200'
      }`}>
        {/* Decorative Background */}
        {!isDark && (
          <>
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-100 rounded-full -mr-20 -mt-20 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-50 rounded-full -ml-20 -mb-20 opacity-50"></div>
          </>
        )}

        <div className="relative z-10">
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 transition-colors ${
              isDark
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className={`text-3xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Create Account</h2>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Join KavachX and start today</p>
          </div>

          {/* Google Register Button */}
          <button
            onClick={handleGoogleRegister}
            disabled={loading}
            className={`w-full mb-6 flex items-center justify-center gap-3 px-4 py-3 rounded-lg transition-all disabled:opacity-50 border-2 ${
              isDark
                ? 'border-white/20 hover:border-white/40 hover:bg-white/10'
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#4285F4" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Sign up with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`flex-1 h-px ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>or</span>
            <div className={`flex-1 h-px ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
          </div>

          {/* Email Register Form */}
          <form onSubmit={handleEmailRegister} className="space-y-4">
            {error && (
              <div className={`p-3 rounded-lg text-sm ${
                isDark
                  ? 'bg-red-500/10 border border-red-500/30 text-red-300'
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}>
                {error}
              </div>
            )}

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
                className={`w-full px-4 py-2 rounded-lg focus:outline-none transition-all focus:ring-2 ${
                  isDark
                    ? 'bg-white/5 border border-white/10 focus:ring-purple-500/50 text-white placeholder-gray-500'
                    : 'bg-white border border-gray-200 focus:ring-purple-500 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className={`w-full px-4 py-2 rounded-lg focus:outline-none transition-all focus:ring-2 ${
                  isDark
                    ? 'bg-white/5 border border-white/10 focus:ring-purple-500/50 text-white placeholder-gray-500'
                    : 'bg-white border border-gray-200 focus:ring-purple-500 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={`w-full px-4 py-2 rounded-lg focus:outline-none transition-all focus:ring-2 ${
                  isDark
                    ? 'bg-white/5 border border-white/10 focus:ring-purple-500/50 text-white placeholder-gray-500'
                    : 'bg-white border border-gray-200 focus:ring-purple-500 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={`w-full px-4 py-2 rounded-lg focus:outline-none transition-all focus:ring-2 ${
                  isDark
                    ? 'bg-white/5 border border-white/10 focus:ring-purple-500/50 text-white placeholder-gray-500'
                    : 'bg-white border border-gray-200 focus:ring-purple-500 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 mt-6"
            >
              {loading ? 'Creating account...' : 'Create Account'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className={`font-semibold transition-colors ${
                  isDark
                    ? 'text-purple-400 hover:text-purple-300'
                    : 'text-purple-600 hover:text-purple-700'
                }`}
              >
                Sign in
              </button>
            </p>
          </div>

          {/* Terms */}
          <p className={`mt-6 text-xs text-center ${
            isDark ? 'text-gray-500' : 'text-gray-600'
          }`}>
            By signing up, you agree to our{' '}
            <a href="#" className={`transition-colors ${
              isDark
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-700 hover:text-gray-900'
            }`}>Terms</a>
            {' '}and{' '}
            <a href="#" className={`transition-colors ${
              isDark
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-700 hover:text-gray-900'
            }`}>Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}