FROM node:20-alpine

RUN apk add --no-cache bash
RUN mkdir /opt/server
RUN adduser -D -h /opt/server crud
RUN chown crud:crud -R /opt/server

WORKDIR /opt/server

COPY package.json ./
COPY src ./src
COPY public ./public

RUN npm install --production

ENV NODE_OPTIONS=--openssl-legacy-provider

RUN chown -R crud:crud /opt/server/node_modules

USER crud

EXPOSE 3000

CMD ["npm", "start"]
