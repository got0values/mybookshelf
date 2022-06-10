FROM node:16

WORKDIR /app/server
COPY /server/package*.json /app/server/
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "node", "server.js" ]

WORKDIR /app/client
COPY /client/package*.json /app/client/
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]