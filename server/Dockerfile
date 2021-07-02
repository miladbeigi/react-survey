FROM node:14.17-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --log-level=verbose

COPY . ./

CMD ["node", "server.js"]
EXPOSE 3001