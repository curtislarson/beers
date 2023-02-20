import React from "react";
import ReactDOM from "react-dom/client";

import "./css/reset.css";
import "./css/main.css";
import "leaflet/dist/leaflet.css";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
