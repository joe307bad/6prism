FROM node:lts-alpine

# Working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --production

# Copy source
COPY . .

# Build and cleanup
ENV NODE_ENV=production
RUN yarn build

# Start server
CMD ["node", "./node_modules/moleculer/bin/moleculer-runner.js"]
