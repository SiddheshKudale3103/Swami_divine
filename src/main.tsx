import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// ✅ GA4
import ReactGA from "react-ga4";

// Read env var injected by Vite
const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

if (MEASUREMENT_ID) {
  ReactGA.initialize(MEASUREMENT_ID);
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname + window.location.search,
  });
} else {
  console.warn("⚠️ GA Measurement ID is missing — check Netlify env vars");
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
