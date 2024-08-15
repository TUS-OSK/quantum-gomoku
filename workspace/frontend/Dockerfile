FROM node:20

WORKDIR /app


COPY package.json package-lock.json ./

COPY . .

RUN apt-get update \
  && apt-get upgrade -y \
  && apt-get install --no-install-recommends -y curl vim \
  && npm install \
  && npm run build

EXPOSE 3000

CMD ["npm","run","dev"]

