FROM node:14.18.0
COPY src/db src/db
ADD .env .env
COPY src/frontend/ src/frontend/
COPY src/server/ src/server/
ADD package.json package.json
RUN npm i --prefix src/frontend
RUN npm i --prefix src/server

cmd ["npm", "start"]

