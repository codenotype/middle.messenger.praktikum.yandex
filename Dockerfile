FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm i
RUN npx webpack

CMD ["npm", "run", "docker-start"]

EXPOSE 3000