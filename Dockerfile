FROM node:17.8-bullseye-slim

# update packages
RUN apt update

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./

# copy source code to /app/src folder
COPY src /app/src

RUN npm install
RUN npm run build

EXPOSE 3000

CMD [ "node", "./dist/app.js" ]