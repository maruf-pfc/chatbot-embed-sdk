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

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3341/admin', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
CMD ["node", "server.js"]