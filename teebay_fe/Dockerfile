# Use an official Node.js image as the base image
FROM node:14-alpine3.13

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json /app/

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . /app/

# Build the application (replace this command with your actual build command)
RUN npm run build

# Command to start your application (replace this with your actual start command)
CMD ["npm", "run", "dev"]