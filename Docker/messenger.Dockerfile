FROM node:10-alpine



WORKDIR /main
# COPY ./package*.json /main
COPY ./package.json /main
COPY ./package-lock.json /main
RUN npm install

# COPY . .
COPY ./messenger.js /main
EXPOSE 3002

CMD ["node", "messenger.js"]