import React from 'react';

export default function GmailInbox({
  isAuthenticated,
  emails,
  loading,
  error,
  onConnect,
  onRefresh,
  onLogout,
  onStartWatch,
}) {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Gmail Inbox</h2>
            <p className="text-slate-600 mt-2 max-w-2xl">
              Connect your account and monitor incoming emails in real time.
              New messages appear instantly as they arrive.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {!isAuthenticated ? (
              <button
                onClick={onConnect}
                className="px-6 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition"
              >
                Connect Gmail
              </button>
            ) : (
              <>
                <button
                  onClick={onRefresh}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-500 transition"
                >
                  Refresh
                </button>
                <button
                  onClick={onStartWatch}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-500 transition"
                >
                  Start Watch
                </button>
                <button
                  onClick={onLogout}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-500 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-8">
            ⚠️ {error}
          </div>
        )}

        {isAuthenticated ? (
          <div className="space-y-4">
            {loading && (
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-slate-700">
                Loading emails…
              </div>
            )}

            {!loading && emails.length === 0 && (
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-slate-700">
                No emails loaded yet. Click "Refresh" to load the latest messages.
              </div>
            )}

            {!loading && emails.length > 0 && (
              <div className="grid gap-4">
                {emails.map((email) => (
                  <article
                    key={email.id}
                    className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {email.subject || '(No Subject)'}
                      </h3>
                      <span className="text-slate-500 text-sm">
                        {new Date(email.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm mt-2">From: {email.from}</p>
                    <div className="mt-4 text-slate-700">
                      {email.snippet}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white p-10 rounded-xl border border-slate-200 shadow-sm text-center text-slate-700">
            <p className="text-xl font-semibold">You are not connected to Gmail yet.</p>
            <p className="mt-2 text-sm">
              Click the button above to authenticate and start receiving emails.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
