import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async (text) => {
    if (!text.trim()) {
      setError('Please paste something to analyze');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error('Analysis failed');
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Backend error. Make sure backend is running on port 5000.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Home 
        result={result}
        loading={loading}
        error={error}
        onAnalyze={handleAnalyze}
        onClear={handleClear}
      />
    </div>
  );
}