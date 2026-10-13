FROM node:20-alpine

WORKDIR /app

# Install dependencies needed by Alpine Linux
RUN apk add --no-cache libc6-compat

# Copy package descriptors first to optimize layer caching
COPY package.json package-lock.json* ./

# Install npm dependencies
RUN npm install

# Copy application source code
COPY . .

# Expose Next.js default port
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Run development server with live reload
CMD ["npm", "run", "dev"]

