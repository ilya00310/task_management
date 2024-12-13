FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN chmod -R 755 /app/node_modules/.bin/sequelize-cli

COPY . .

EXPOSE 8081

CMD ["npm", "run", "start_service"]