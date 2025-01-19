if [ -z "${VITE_API_URL}" ]; then
  echo Input VITE_API_URL is missing
  exit 1
fi

cat /opt/nginx.conf | envsubst >/etc/nginx/nginx.conf

nginx -g 'daemon off;'