// src/components/EmailBreachChecker.jsx
import React, { useState } from "react";
import {
  Mail,
  Loader,
  AlertCircle,
  CheckCircle,
  Shield,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function EmailBreachChecker() {
  const { isDark } = useTheme();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const checkEmailBreach = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter a valid email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const API_BASE_URL =
      import.meta.env.VITE_API_URL || "http://localhost:2000";

    try {
      const response = await fetch(`${API_BASE_URL}/breach-check?email=${encodeURIComponent(email)}`);

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Handle the API response format
      setResult({
        email: email,
        success: data.success,
        found: data.found || 0,
        fields: data.fields || [],
        sources: data.sources || [],
        isBreached: data.success && (data.found > 0),
        breachCount: data.found || 0,
      });
    } catch (err) {
      console.error("Email breach check error:", err);
      setError(`Check Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-linear-to-br from-slate-950 via-slate-900 to-slate-950"
          : "bg-linear-to-br from-gray-50 via-white to-gray-100"
      }`}
    >
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-0 left-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-10 ${
            isDark ? "bg-green-600" : "bg-green-400"
          }`}
        ></div>
        <div
          className={`absolute top-1/3 right-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-10 ${
            isDark ? "bg-teal-600" : "bg-teal-400"
          }`}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div
              className={`p-4 rounded-lg ${
                isDark ? "bg-green-500/20" : "bg-green-100"
              }`}
            >
              <Mail
                className={`w-8 h-8 ${
                  isDark ? "text-green-400" : "text-green-600"
                }`}
              />
            </div>
          </div>
          <h1
            className={`text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r ${
              isDark
                ? "from-green-400 via-teal-400 to-green-400 bg-clip-text text-transparent"
                : "from-green-600 via-teal-600 to-green-600 bg-clip-text text-transparent"
            }`}
          >
            Email Breach Checker
          </h1>
          <p
            className={`text-lg md:text-xl max-w-2xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Check if your email address has been compromised in data breaches.
            Stay informed and protect your online security.
          </p>
        </div>

        {/* Check Card */}
        <div
          className={`rounded-2xl border transition-all duration-300 p-8 mb-8 ${
            isDark
              ? "bg-white/5 border-white/10 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20"
              : "bg-gray-100 border-gray-200 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20"
          }`}
        >
          {/* Input Form */}
          <form onSubmit={checkEmailBreach} className="space-y-4">
            <div>
              <label
                className={`block text-sm font-semibold mb-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Enter Email Address To Check
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`flex-1 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isDark
                      ? "bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-green-500 focus:bg-white/20 focus:outline-none"
                      : "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:bg-white focus:outline-none"
                  }`}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                    loading
                      ? isDark
                        ? "bg-green-500/30 text-gray-400 cursor-not-allowed"
                        : "bg-green-100 text-gray-400 cursor-not-allowed"
                      : isDark
                        ? "bg-linear-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white hover:shadow-lg hover:shadow-green-500/50"
                        : "bg-linear-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white hover:shadow-lg hover:shadow-green-500/50"
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      Check Breach
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Error Display */}
          {error && (
            <div
              className={`mt-6 p-4 rounded-lg border flex items-center gap-3 ${
                isDark
                  ? "bg-red-500/10 border-red-500/20 text-red-400"
                  : "bg-red-50 border-red-200 text-red-700"
              }`}
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Results Display */}
          {result && (
            <div className="mt-8">
              <div
                className={`p-6 rounded-lg border ${
                  result.isBreached
                    ? isDark
                      ? "bg-red-500/10 border-red-500/20"
                      : "bg-red-50 border-red-200"
                    : isDark
                      ? "bg-green-500/10 border-green-500/20"
                      : "bg-green-50 border-green-200"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  {result.isBreached ? (
                    <AlertCircle className="w-6 h-6 text-red-500" />
                  ) : (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  )}
                  <h3
                    className={`text-lg font-semibold ${
                      result.isBreached ? "text-red-700" : "text-green-700"
                    }`}
                  >
                    {result.isBreached
                      ? `⚠️ Found in ${result.breachCount} Data Breach${result.breachCount !== 1 ? 'es' : ''}`
                      : "✅ Not Found in Data Breaches"}
                  </h3>
                </div>

                {result.isBreached ? (
                  <div>
                    <p className={`mb-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Your email address has been found in <strong>{result.breachCount}</strong> data breaches. The following information may have been exposed:
                    </p>
                    
                    {/* Exposed Fields */}
                    <div className="mb-4">
                      <h4 className={`font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                        Potentially Exposed Data:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {result.fields.map((field, index) => (
                          <span
                            key={index}
                            className={`px-3 py-1 rounded-full text-sm ${
                              isDark
                                ? "bg-red-500/20 text-red-300 border border-red-500/30"
                                : "bg-red-100 text-red-700 border border-red-200"
                            }`}
                          >
                            {field.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Breach Sources */}
                    <div>
                      <h4 className={`font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                        Breach Sources ({result.sources.length}):
                      </h4>
                      <div className="max-h-60 overflow-y-auto space-y-2">
                        {result.sources.slice(0, 20).map((source, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded border ${
                              isDark
                                ? "bg-white/5 border-white/10"
                                : "bg-white border-gray-200"
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                                  {source.name}
                                </p>
                                {source.date && (
                                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                    Breach Date: {source.date || 'Unknown'}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        {result.sources.length > 20 && (
                          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                            ... and {result.sources.length - 20} more breaches
                          </p>
                        )}
                      </div>
                    </div>

                    <div className={`mt-4 p-3 rounded border ${isDark ? "bg-yellow-500/10 border-yellow-500/20" : "bg-yellow-50 border-yellow-200"}`}>
                      <p className={`text-sm ${isDark ? "text-yellow-300" : "text-yellow-700"}`}>
                        <strong>Security Recommendations:</strong> Change your password immediately, enable two-factor authentication, and monitor your accounts for suspicious activity. Consider using a password manager and unique passwords for each service.
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    Good news! Your email address was not found in any known data breaches. However, continue to practice good security habits and use strong, unique passwords.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div
          className={`rounded-2xl border transition-all duration-300 p-6 ${
            isDark
              ? "bg-white/5 border-white/10"
              : "bg-gray-100 border-gray-200"
          }`}
        >
          <h3
            className={`text-xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg ${isDark ? "bg-white/10" : "bg-white"}`}>
              <Shield className={`w-6 h-6 mb-2 ${isDark ? "text-green-400" : "text-green-600"}`} />
              <h4 className={`font-semibold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                Breach Database
              </h4>
              <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                We query comprehensive breach databases to check if your email has been exposed.
              </p>
            </div>
            <div className={`p-4 rounded-lg ${isDark ? "bg-white/10" : "bg-white"}`}>
              <CheckCircle className={`w-6 h-6 mb-2 ${isDark ? "text-green-400" : "text-green-600"}`} />
              <h4 className={`font-semibold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                Instant Results
              </h4>
              <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                Get immediate feedback on whether your email has been compromised in data breaches.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}