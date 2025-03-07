FROM node:20-alpine

# Install bash (optional)
RUN apk add --no-cache bash

# Create a directory for the app
RUN mkdir /opt/server

# Create a non-root user
RUN adduser -D -h /opt/server crud

# Set ownership of the app directory
RUN chown crud:crud -R /opt/server

# Set the working directory
WORKDIR /opt/server

# Copy package.json and other JS files
COPY package.json ./
COPY *.js ./

# Install dependencies (with --legacy-peer-deps)
RUN npm install --omit=dev --legacy-peer-deps

# Switch to the non-root user
USER crud

# Expose the application port
EXPOSE 8080

# Start the application
CMD ["node", "server.js"]