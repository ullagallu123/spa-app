# Base image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the app files
COPY . .

# Build the app
RUN npm run build

# Expose port
EXPOSE 3000

# Serve the app
CMD ["npm", "start"]
