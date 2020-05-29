FROM node:lts AS builder
WORKDIR /build
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run-script build

FROM node:lts
WORKDIR /app
COPY package.json ./
COPY --from=builder /build/package-lock.json .
RUN npm ci --only=production
COPY --from=builder /build/dist /app/dist
CMD node .