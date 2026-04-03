import React, { useState } from "react";
import { Video, UploadCloud, ShieldCheck, CircleSlash } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const DeepfakeVideoDetector = () => {
  const { isDark } = useTheme();
  const [file, setFile] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:2000";

  const handleUpload = (e) => {
    const selected = e.target.files?.[0];
    setData(null);
    setError(null);

    if (!selected) {
      return;
    }

    if (!selected.type.startsWith("video/")) {
      setError("Please upload a valid video file.");
      return;
    }

    setFile(selected);
    setVideoURL(URL.createObjectURL(selected));
  };

  const analyzeVideo = async () => {
    if (!file) {
      setError("Upload a video to analyze.");
      return;
    }

    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_URL}/video`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const body = await res.text();
        throw new Error(`API error: ${res.status} ${body}`);
      }

      const result = await res.json();
      if (result.success === false) {
        throw new Error(result.error || "Detection failed");
      }

      setData(result.data.prediction);
    } catch (err) {
      setError(err.message || "Unable to analyze video.");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const fakePercentage =
    data?.stats?.total_frames_sampled > 0
      ? Math.round(
          (data.stats.fake_frames / data.stats.total_frames_sampled) * 100,
        )
      : 0;

  const predictionIsFake = data?.prediction === "FAKE";
  const scorePercentage = predictionIsFake ? fakePercentage : 100 - fakePercentage;
  const scoreLabel = predictionIsFake ? "Estimated fakiness" : "Estimated realness";
  const scoreColor = predictionIsFake ? "red" : "green";

  return (
    <div
      className={`min-h-screen p-6 relative overflow-hidden transition-colors duration-300 ${
        isDark
          ? "bg-slate-950 text-white"
          : "bg-linear-to-b from-slate-100 via-white to-slate-200 text-slate-900"
      }`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-10 -left-24 w-96 h-96 rounded-full bg-purple-500/30 blur-3xl" />
        <div className="absolute bottom-20 -right-24 w-80 h-80 rounded-full bg-cyan-500/25 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <section className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span role="img" aria-label="video">
              🎥
            </span>{" "}
            Deepfake Video Detector
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-300">
            Upload a short video, click Analyze, and review the prediction confidence with
            a frame-based assessment.
          </p>
        </section>

        <section
          className={`rounded-3xl border ${
            isDark
              ? "border-white/10 bg-slate-900/50"
              : "border-slate-200 bg-white/80"
          }  shadow-xl backdrop-blur-xl p-6 mb-8`}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
            <label
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium cursor-pointer transition ${
                isDark
                  ? "bg-slate-800 hover:bg-slate-700"
                  : "bg-slate-100 hover:bg-slate-200"
              }`}
            >
              <UploadCloud className="w-5 h-5" />
              <span>Select Video</span>
              <input
                type="file"
                accept="video/*"
                onChange={handleUpload}
                className="hidden"
              />
            </label>

            <button
              onClick={analyzeVideo}
              disabled={loading || !file}
              className={`inline-flex items-center gap-2 px-6 py-2 rounded-xl font-semibold transition transform ${
                loading || !file
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-linear-to-r from-purple-500 to-fuchsia-500 hover:scale-105"
              }`}
            >
              <Video className="w-4 h-4" />
              {loading ? "Analyzing..." : "Analyze Video"}
            </button>
          </div>

          {error && (
            <div className="rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-red-200 text-sm">
              {error}
            </div>
          )}

          {videoURL && (
            <video
              src={videoURL}
              controls
              className="w-full h-auto rounded-2xl  border border-slate-300/40 mt-4"
            />
          )}

          {!file && (
            <p className="text-sm text-slate-400 mt-3">
              Use a short .mp4/.mov/.webm file (10-30 seconds recommended).
            </p>
          )}
        </section>

        {data && (
          <section
            className={`rounded-3xl border ${
              isDark
                ? "border-white/10 bg-slate-900/60"
                : "border-slate-300 bg-white/90"
            } shadow-xl p-6`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <h2 className="text-2xl font-semibold">Detection Result</h2>
              <span
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm ${
                  predictionIsFake
                    ? "bg-red-600/90 text-white"
                    : "bg-green-600/90 text-white"
                }`}
              >
                {predictionIsFake ? <CircleSlash className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                {predictionIsFake ? "FAKE" : "REAL"}
              </span>
            </div>

            <div className="mb-6">
              <div
                className={`w-full h-4 rounded-full overflow-hidden ${
                  predictionIsFake ? "bg-red-200" : "bg-green-200"
                }`}
              >
                <div
                  className={`h-full transition-all duration-700 ${
                    predictionIsFake ? "bg-red-500" : "bg-green-500"
                  }`}
                  style={{ width: `${scorePercentage}%` }}
                />
              </div>
              <p className="mt-2 text-sm">
                {scoreLabel}: <strong>{scorePercentage}%</strong> (derived from sampled frames)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl p-4 bg-slate-800/60">
                <p className="text-xs text-slate-300 uppercase tracking-wide">Fake frames</p>
                <p className="mt-1 text-xl font-bold text-red-300">{data.stats?.fake_frames ?? "-"}</p>
              </div>
              <div className="rounded-xl p-4 bg-slate-800/60">
                <p className="text-xs text-slate-300 uppercase tracking-wide">Real frames</p>
                <p className="mt-1 text-xl font-bold text-green-300">{data.stats?.real_frames ?? "-"}</p>
              </div>
              <div className="rounded-xl p-4 bg-slate-800/60">
                <p className="text-xs text-slate-300 uppercase tracking-wide">Total sampled</p>
                <p className="mt-1 text-xl font-bold">{data.stats.total_frames_sampled ?? "-"}</p>
              </div>
            </div>

          </section>
        )}
      </div>
    </div>
  );
};

export default DeepfakeVideoDetector;