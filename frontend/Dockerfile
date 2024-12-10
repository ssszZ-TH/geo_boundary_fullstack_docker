# Dockerfile for frontend
FROM node:23-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# expose port 5173
EXPOSE 5173

# Run the application in development mode and expose host 0.0.0.0
CMD ["npm", "run", "dev"]
