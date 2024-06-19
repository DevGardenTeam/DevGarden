# Use an official nginx image
FROM nginx:alpine

# Copy the web-build folder to the nginx html folder
COPY ./web-build /usr/share/nginx/html

# Expose the port nginx is running on
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
