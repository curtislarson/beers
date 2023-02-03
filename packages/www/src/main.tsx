import React from "react";
import ReactDOM from "react-dom/client";

import "./css/main.css";
import App from "./App";
import "leaflet/dist/leaflet.css";

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
