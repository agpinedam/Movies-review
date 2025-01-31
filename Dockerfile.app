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

# Expose both frontend (Vite) and backend ports
EXPOSE 5173 5000

# Start backend first, then frontend
CMD ["sh", "-c", "npm run dev"]
