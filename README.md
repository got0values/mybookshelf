# My Bookshelf
A web app for users to save information about books they have read.

## Requirements
* Node 14+
* MongoDB Atlas
* Npm
* Auth0

## Installation
Clone both server and client folders

### Server
1. cd into server folder
2. "npm install" packages
3. create "config.env" file with the following:
* ATLAS_URI={mongodb atlas uri}
* PORT=5000
4. "node server.js" to start the server

### Client
1. cd into client folder
2. "npm install" package
3. create ".env" file with the following:
* REACT_APP_DOMAIN={Auth0 domain}
* REACT_APP_CLIENT_ID={Auth0 Client ID}
* REACT_APP_SERVER=localhost:5000
4. "npm start"
