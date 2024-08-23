# Stage 1: Build the application
FROM node:20 AS builder

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Serve the application
FROM node:20-alpine AS runner

# Set the working directory
WORKDIR /app

# Install a minimal set of dependencies to run the application
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
RUN npm install --production

# Copy the built application from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./

# Set environment variables (you can also use a .env file)
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]