FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN chmod 777 /app/node_modules
EXPOSE 3000
CMD [ "npm", "run", "dev" ]
