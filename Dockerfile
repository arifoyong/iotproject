# FROM node:10-alpine

# RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# WORKDIR /home/node/app

# COPY package*.json ./

# USER node

# COPY --chown=node:node . .

# EXPOSE 5000

# CMD [ "npm", "run","start" ]

FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

copy . .

ENV NODE_ENV production
ENV PORT 5000

EXPOSE 5000
CMD ["npm", "run", "start"]