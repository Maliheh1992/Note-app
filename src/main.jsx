import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import App from "./App.jsx";
import { PaletteProvider } from "./context/PalletteContext.jsx";
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <PaletteProvider>
      <App />
    </PaletteProvider>
  </React.StrictMode>
);
