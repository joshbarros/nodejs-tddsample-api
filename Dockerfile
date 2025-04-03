FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript code
RUN npm run build

# Test stage
FROM node:20-alpine AS test

WORKDIR /app

# Copy package files and install dependencies (including dev dependencies)
COPY package*.json ./
RUN npm ci --no-husky

# Copy source code
COPY . .

# Run tests
CMD ["npm", "run", "test:ci"]

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev --no-husky

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port the app runs on
EXPOSE 3000

# Start the server
CMD ["node", "dist/src/app.js"]
