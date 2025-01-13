#build stage for serverrrrrrrrrrrrrrrrrr
FROM node:22
WORKDIR /usr/src/deplo
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]