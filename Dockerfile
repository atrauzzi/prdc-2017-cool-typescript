FROM node:latest
MAINTAINER "Alexander Trauzzi" <atrauzzi@gmail.com>

COPY . /app
WORKDIR /app

RUN ["yarn", "install"]
RUN ["yarn", "build"]

EXPOSE 80

ENTRYPOINT ["yarn"]
CMD ["serve"]