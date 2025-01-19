#!/bin/sh

# Check if VITE_API_URL is set
if [ -z "${VITE_API_URL}" ]; then
  echo "Input VITE_API_URL is missing"
  exit 1
fi

# Perform environment variable substitution and create the final nginx.conf
envsubst '$VITE_API_URL' < /opt/nginx.conf > /etc/nginx/nginx.conf

# Test Nginx configuration before starting
nginx -t
if [ $? -ne 0 ]; then
  echo "Nginx configuration test failed"
  exit 1
fi

# Start Nginx
nginx -g 'daemon off;'
