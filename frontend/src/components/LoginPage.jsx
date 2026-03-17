import React, { useState } from 'react';
import { ArrowRight, Mail, Lock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function LoginPage({ onClose, onSwitchToRegister, onGoogleSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { isDark } = useTheme();

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const mockUser = {
        name: 'John Doe',
        email: 'john@example.com',
        picture: 'https://via.placeholder.com/40'
      };
      onGoogleSuccess(mockUser);
      setLoading(false);
    }, 1000);
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const mockUser = {
        name: email.split('@')[0],
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
      <div className="w-full max-w-md my-8 relative">
        {/* Animated Background Gradient */}
        {isDark && (
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur opacity-20 animate-pulse"></div>
        )}

        <div className={`relative rounded-2xl shadow-2xl p-8 border transition-colors duration-300 ${
          isDark
            ? 'bg-gradient-to-br from-slate-900 to-slate-800 border-white/10'
            : 'bg-white border-gray-200'
        }`}>
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-6 right-6 transition-colors p-2 rounded-lg ${
              isDark
                ? 'text-gray-400 hover:text-white hover:bg-white/10'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="mb-8 text-center">
            <div className={`inline-block mb-4 px-3 py-1 rounded-full ${
              isDark
                ? 'bg-purple-500/20 border border-purple-400/30'
                : 'bg-purple-100 border border-purple-300'
            }`}>
              <span className={`text-xs font-medium ${
                isDark ? 'text-purple-300' : 'text-purple-700'
              }`}>KavachX Security</span>
            </div>
            <h2 className={`text-3xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Welcome Back</h2>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Secure your digital world</p>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className={`w-full mb-6 flex items-center justify-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed border-2 ${
              isDark
                ? 'bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/40'
                : 'bg-gray-100 hover:bg-gray-200 border-gray-300 hover:border-gray-400'
            }`}
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#4285F4" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className={`font-semibold group-hover:transition-colors ${
              isDark
                ? 'text-gray-100 group-hover:text-white'
                : 'text-gray-700 group-hover:text-gray-900'
            }`}>
              {loading ? 'Signing in...' : 'Continue with Google'}
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`flex-1 h-px ${isDark ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-300 to-transparent'}`}></div>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>or email</span>
            <div className={`flex-1 h-px ${isDark ? 'bg-gradient-to-l from-transparent via-white/20 to-transparent' : 'bg-gradient-to-l from-transparent via-gray-300 to-transparent'}`}></div>
          </div>

          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            {/* Email Input */}
            <div className="group">
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 group-focus-within:transition-colors ${
                  isDark
                    ? 'text-gray-400 group-focus-within:text-purple-400'
                    : 'text-gray-500 group-focus-within:text-purple-600'
                }`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg focus:outline-none transition-all duration-300 ${
                    isDark
                      ? 'bg-white/5 border border-white/10 hover:border-white/20 focus:border-purple-500/50 focus:bg-white/10 text-white placeholder-gray-500'
                      : 'bg-gray-100 border border-gray-300 hover:border-gray-400 focus:border-purple-500 focus:bg-white text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="group">
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 group-focus-within:transition-colors ${
                  isDark
                    ? 'text-gray-400 group-focus-within:text-purple-400'
                    : 'text-gray-500 group-focus-within:text-purple-600'
                }`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={`w-full pl-10 pr-12 py-2.5 rounded-lg focus:outline-none transition-all duration-300 ${
                    isDark
                      ? 'bg-white/5 border border-white/10 hover:border-white/20 focus:border-purple-500/50 focus:bg-white/10 text-white placeholder-gray-500'
                      : 'bg-gray-100 border border-gray-300 hover:border-gray-400 focus:border-purple-500 focus:bg-white text-gray-900 placeholder-gray-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${
                    isDark
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-gray-600 hover:text-gray-700'
                  }`}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a href="#" className={`text-sm transition-colors ${
                isDark
                  ? 'text-purple-400 hover:text-purple-300'
                  : 'text-purple-600 hover:text-purple-700'
              }`}>
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-2.5 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {loading ? 'Signing in...' : 'Sign In'}
              {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Don't have an account?{' '}
              <button
                onClick={onSwitchToRegister}
                className={`font-semibold transition-colors ${
                  isDark
                    ? 'text-purple-400 hover:text-purple-300'
                    : 'text-purple-600 hover:text-purple-700'
                }`}
              >
                Create one
              </button>
            </p>
          </div>

          {/* Footer */}
          <div className={`mt-6 pt-6 border-t text-center text-xs ${
            isDark
              ? 'border-white/10 text-gray-500'
              : 'border-gray-300 text-gray-600'
          }`}>
            <p>By signing in, you agree to our Terms & Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}