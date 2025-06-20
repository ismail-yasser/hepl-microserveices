# Stage 1: Build the React app
FROM node:18-alpine as build-stage

WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the public and src directories
COPY public/ ./public/
COPY src/ ./src/

# *** CRITICAL: CORRECTED ENV VARS FOR REACT APP (Point to Nginx proxy paths) ***
ENV REACT_APP_USER_SERVICE_URL=/api/users
ENV REACT_APP_HELP_SERVICE_URL=/api/help

# Build the React app
RUN npm run build

# Stage 2: Serve the app with NGINX
FROM nginx:alpine

# Remove default NGINX configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy a custom NGINX configuration for React app
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React app from the build stage into NGINX's web root
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose port 80 as NGINX defaults to 80
EXPOSE 80

# Command to run NGINX (default NGINX command is fine)
CMD ["nginx", "-g", "daemon off;"]