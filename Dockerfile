FROM node:14
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . .
EXPOSE 3000
RUN npm run build
RUN npm i -g serve
CMD ["serve", "build"]
# RUN serve -s build
# CMD [ "npm", "start" ]