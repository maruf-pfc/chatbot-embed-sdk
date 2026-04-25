# Use Node.js 20 Alpine for smaller image size
FROM node:20-alpine

# Install bun
RUN npm install -g bun

# Create app directory
WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./

# Install dependencies
RUN bun install --production

# Copy application code
COPY . .

# Create necessary directories
RUN mkdir -p database public admin

# Expose port
EXPOSE 3341

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3341

# Install curl for healthcheck
RUN apk add --no-cache curl

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3341/coffee-shop.html || exit 1

# Start the application
CMD ["node", "server.js"]