if [ -z "${VITE_API_URL}" ]; then
  echo Input VITE_API_URL is missing
  exit 1
fi

cat /opt/nginx.conf | envsubst >/etc/nginx/nginx.conf

nginx -g 'daemon off;'

if [ -z "${VITE_API_URL}" ]; then
  echo "Input VITE_API_URL is missing"
  exit 1
fi

# Perform environment variable substitution and create the final nginx.conf
cat /opt/nginx.conf | envsubst > /etc/nginx/nginx.conf

# Start Nginx
nginx -g 'daemon off;'