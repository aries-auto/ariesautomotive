FROM node:5.0.0

COPY . /
RUN npm install
RUN npm run build -- --release

EXPOSE 8080

CMD ["node", "build/server.js"]
