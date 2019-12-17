FROM node:10-alpine



WORKDIR /main/
COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 3000

RUN npm run build

CMD ["node", "frontend.js"]