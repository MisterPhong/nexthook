# Stage 1: Build the Next.js application
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Run the Next.js application
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=build /app ./

# Install only production dependencies
RUN npm install --production --force

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
