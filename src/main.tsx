import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import ApiProvider from "./context/ApiContext.tsx";
import AppManager from "./context/AppManager.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApiProvider>
      <AppManager>
        <App />
      </AppManager>
    </ApiProvider>
  </React.StrictMode>
);
