import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import { AuthProvider } from "./contexts/AuthContext"; 

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
