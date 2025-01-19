FROM node:20 AS build-stage

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

# Debugging step: Verify build output
RUN ls -al /app  # This will show the files in the container after build

FROM nginx:alpine

COPY --from=build-stage /app/build /usr/share/nginx/html  # Adjust path if needed

COPY default.conf /etc/nginx/conf.d/default.conf

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
