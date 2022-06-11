FROM node:14
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "node", "server.js" ]