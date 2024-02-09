import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import ApiProvider from "./context/ApiContext.tsx";
import AppManagerContext from "./context/AppManagerContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApiProvider>
      <AppManagerContext>
        <App />
      </AppManagerContext>
    </ApiProvider>
  </React.StrictMode>
);
