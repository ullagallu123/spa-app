FROM node:20-alpine
RUN apk add --no-cache bash
RUN mkdir /opt/server
RUN adduser -D -h /opt/server crud
RUN chown crud:crud -R /opt/server
WORKDIR /opt/server
COPY package.json ./
COPY *.js ./
COPY .env ./
RUN npm install --production
USER crud
EXPOSE 8080
CMD ["node", "server.js"]