FROM node:12
#RUN mkdir -p /home/node/app
COPY . /home/node/app/
WORKDIR /home/node/app/
RUN npm install
EXPOSE 3000 3001
CMD [ "npm", "start" ]