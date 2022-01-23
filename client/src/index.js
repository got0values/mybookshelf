import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
//import auth0
import { Auth0Provider } from "@auth0/auth0-react";
require("dotenv").config({ path: "../.env" });
const domain = process.env.REACT_APP_DOMAIN;
const clientID = process.env.REACT_APP_CLIENT_ID;
const server = process.env.REACT_APP_SERVER;

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientID}
      redirectUri={window.location.origin}
      cacheLocation='localstorage'
    >
      <BrowserRouter>
        <App server={server} />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);