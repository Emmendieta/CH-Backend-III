FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

# CMD [ "node src/server.js" ]
CMD [ "npm", "start" ]