# Use the official Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Set the environment variable in docker-compose.yml for dev and prod
ARG NODE_ENV

# Install dependencies
RUN npm install
RUN if [ "$NODE_ENV" = "production" ]; \
        then npm install --only=production; \
        else npm install; \
    fi
# Copy the rest of the application code
COPY . ./

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node","index.js"]