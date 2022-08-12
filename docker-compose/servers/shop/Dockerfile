FROM node:18-alpine3.15

WORKDIR /workspace

COPY package*.json ./
RUN npm install
COPY . .

CMD [ "npm", "start" ]