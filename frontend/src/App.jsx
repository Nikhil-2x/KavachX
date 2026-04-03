import React, { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import About from "./components/About";
import CyberAwareness from "./components/CyberAwareness";
import GmailInbox from "./components/GmailInbox";
import DeepFakeDetector from "./components/DeepFakeDetector";
import io from "socket.io-client";
import WebsiteDetector from "./components/WebsiteDetector";
import AttackerIntentSimulation from "./components/AttackerIntentSimulation";
import ThreatSimilarityEngine from "./components/ThreatSimilarityEngine";
import ChatbotAgent from "./components/ChatbotAgent";
import DeepfakeVideoDetecter from "./components/DeepFakeVideo";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:2000";

// Tab ID → URL path mapping
const TAB_TO_PATH = {
  home: "/",
  about: "/about",
  features: "/features",
  inbox: "/inbox",
  deepfake: "/deepfake",
  "deepfake-video": "/deepfake-video",
  cyberawareness: "/cyber-awareness",
  "website-detector": "/website-detector",
  "attacker-intent": "/attacker-intent",
  "threat-similarity": "/threat-similarity",
};

// URL path → Tab ID mapping (reverse)
const PATH_TO_TAB = Object.fromEntries(
  Object.entries(TAB_TO_PATH).map(([tab, path]) => [path, tab])
);

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const socketRef = useRef(null);

  // Derive activeTab from current URL path
  const activeTab = PATH_TO_TAB[location.pathname] || "home";

  // Navigate to a URL when a tab is selected
  const setActiveTab = (tabId) => {
    const path = TAB_TO_PATH[tabId];
    if (path && path !== location.pathname) {
      navigate(path);
    }
  };

  const checkAuthStatus = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/status`);
      const data = await res.json();
      const auth = Boolean(data.authenticated);
      setIsAuthenticated(auth);

      // When authenticated, redirect to inbox if on home
      if (auth && location.pathname === "/") {
        navigate("/inbox");
      }
    } catch (err) {
      console.error("Failed to check auth status", err);
    }
  };

  const fetchLatestEmails = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/gmail/latest`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to load emails");
      }
      const data = await res.json();
      setEmails(data);
    } catch (err) {
      console.error("Error fetching emails", err);
      setError(err.message || "Failed to fetch emails");
    } finally {
      setLoading(false);
    }
  };

  const startWatch = async () => {
    try {
      await fetch(`${API_URL}/gmail/start-watch`, { method: "POST" });
    } catch (err) {
      console.error("Failed to start watch", err);
      setError("Failed to start email watch");
    }
  };

  const handleLoginClick = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, { method: "POST" });
    } catch (err) {
      console.error("Logout error", err);
    }

    setIsAuthenticated(false);
    setEmails([]);
    setError("");

    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    navigate("/");
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("auth") === "success") {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    checkAuthStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    fetchLatestEmails();
    startWatch();

    if (!socketRef.current) {
      socketRef.current = io(API_URL);
      socketRef.current.on("new-email", (email) => {
        setEmails((prev) => [email, ...prev]);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [isAuthenticated]);

  const inboxProps = {
    isAuthenticated,
    emails,
    loading,
    error,
    onConnect: handleLoginClick,
    onRefresh: fetchLatestEmails,
    onStartWatch: startWatch,
    onLogout: handleLogout,
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAuthenticated={isAuthenticated}
        user={null}
        onLogout={handleLogout}
        onLoginClick={handleLoginClick}
      />

      <main>
        <Routes>
          <Route path="/" element={<Hero setActiveTab={setActiveTab} />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/features"
            element={<Features setActiveTab={setActiveTab} />}
          />
          <Route path="/inbox" element={<GmailInbox {...inboxProps} />} />
          <Route path="/deepfake" element={<DeepFakeDetector />} />
          <Route path="/deepfake-video" element={<DeepfakeVideoDetecter />} />
          <Route path="/cyber-awareness" element={<CyberAwareness />} />
          <Route path="/website-detector" element={<WebsiteDetector />} />
          <Route
            path="/attacker-intent"
            element={<AttackerIntentSimulation />}
          />
          <Route
            path="/threat-similarity"
            element={<ThreatSimilarityEngine />}
          />
          {/* Fallback: redirect unknown paths to home */}
          <Route path="*" element={<Hero setActiveTab={setActiveTab} />} />
        </Routes>
      </main>

      {/* Chatbot is always visible */}
      <ChatbotAgent />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}