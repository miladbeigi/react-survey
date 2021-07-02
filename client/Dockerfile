FROM node:14.17-alpine as build

WORKDIR /app

COPY package-docker.json package-lock.json ./

RUN  mv package-docker.json package.json && \
        npm install --log-level=verbose

COPY public  /app/public
COPY src  /app/src

CMD ["npm", "start"]