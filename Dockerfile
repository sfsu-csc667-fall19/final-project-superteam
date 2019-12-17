FROM node:10-alpine



WORKDIR /main/
COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 3000


CMD ["node", "frontend.js"]