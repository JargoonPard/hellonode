FROM node:4.4
EXPOSE 8082
COPY server.js .
CMD node server.js