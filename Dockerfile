# Use official Node LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only dependency files first (Docker cache optimization)
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy rest of the app
COPY . .

# App runs on port 3000
EXPOSE 3000

# Start server
CMD ["node", "server.js"]
