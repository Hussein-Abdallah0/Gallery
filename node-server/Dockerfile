FROM node:18

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other files
COPY . .

# Expose WebSocket port
EXPOSE 6001

# Start the server
CMD ["node", "server.js"]