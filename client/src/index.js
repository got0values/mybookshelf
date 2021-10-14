import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
//import auth0
import { Auth0Provider } from "@auth0/auth0-react";
require("dotenv").config({ path: "../config.env" });
const domain = process.env.DOMAIN || 5000;
const clientID = process.env.CLIENT_ID || 5000;

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientID}
    redirectUri={window.location.origin}
    cacheLocation='localstorage'
  >
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
  </Auth0Provider>,
  document.getElementById("root")
);