import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./providers/AppContextProvider.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="828690202013-j4uthjgmoqum2afk0neddj0cis98g74f.apps.googleusercontent.com">
    <React.StrictMode>
      <AppContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppContextProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
