# Use the official Node.js image as a base
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app will run on (adjust if necessary)
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev"]
