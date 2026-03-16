import React from 'react';

export default function InputSection({ input, setInput, onAnalyze, loading }) {
  return (
    <div className="bg-slate-800 rounded-lg p-8 mb-6 border-2 border-slate-700 shadow-xl max-w-4xl mx-auto">
      <label className="block text-white font-bold mb-4 text-lg">
        📧 Paste Email, Message, or URL to Analyze
      </label>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.ctrlKey && e.key === 'Enter') {
            onAnalyze();
          }
        }}
        placeholder="Paste suspicious email, message, or URL here..."
        className="w-full h-40 p-4 bg-slate-700 text-white rounded-lg border-2 border-slate-600 focus:border-blue-500 focus:outline-none resize-none text-base"
      />
      <div className="flex gap-4 mt-4">
        <button
          onClick={onAnalyze}
          disabled={loading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg disabled:bg-slate-600 transition text-lg"
        >
          {loading ? '⏳ Analyzing...' : '🔍 Scan for Threats'}
        </button>
        <button
          onClick={() => setInput('')}
          className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 rounded-lg transition text-lg"
        >
          Clear
        </button>
      </div>
      <p className="text-slate-400 text-xs mt-3 text-center">
        Tip: Press Ctrl+Enter to analyze
      </p>
    </div>
  );
}