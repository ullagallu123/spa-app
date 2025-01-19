# Stage 1: Build React App
FROM node:20 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /opt/nginx.conf
COPY all.sh /all.sh
RUN chmod +x /all.sh
EXPOSE 80
CMD ["sh", "/all.sh"]
