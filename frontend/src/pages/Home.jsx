import React, { useState } from 'react';
import InputSection from '../components/InputSection';
// import Dashboard from '../components/Dashboard';

export default function Home({ result, loading, error, onAnalyze, onClear }) {
  const [input, setInput] = useState('');

  const handleAnalyzeClick = async () => {
    await onAnalyze(input);
  };

  const handleNewAnalysis = () => {
    setInput('');
    onClear();
  };

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-8 mt-6">
          <h1 className="text-5xl font-bold text-white mb-2">🛡️ KavachX</h1>
          <p className="text-slate-300 text-xl">Explainable Cyber Defense Platform</p>
          <p className="text-slate-400 text-sm mt-2">AI-Powered Threat Detection & Analysis</p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-900 border-2 border-red-600 text-white p-4 rounded-lg mb-6 max-w-4xl mx-auto">
            ⚠️ {error}
          </div>
        )}

        {/* INPUT OR DASHBOARD */}
        {!result ? (
          <InputSection
            input={input}
            setInput={setInput}
            onAnalyze={handleAnalyzeClick}
            loading={loading}
          />
        ) : (
          <>
            <button
              onClick={handleNewAnalysis}
              className="mb-6 bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg transition font-semibold"
            >
              ← Analyze Another Threat
            </button>
            {/* <Dashboard result={result} /> */}
          </>
        )}

        {/* EMPTY STATE */}
        {!result && !loading && (
          <div className="bg-slate-800 rounded-lg p-12 border-2 border-slate-700 text-center max-w-4xl mx-auto">
            <p className="text-slate-300 text-lg">👉 Paste a message above to get started</p>
            <p className="text-slate-400 text-sm mt-2">
              Detects phishing • Malicious URLs • Prompt Injection • And more
            </p>
          </div>
        )}
      </div>
    </div>
  );
}