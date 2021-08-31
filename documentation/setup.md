# Setup

## Requirements

- [Docker](https://docs.docker.com/engine/install/)
- [Docker-compose](https://docs.docker.com/compose/install/)

## Installation

1. Clone this github repo

``` bash
git clone https://github.com/CarPlan/Backend.git
```

2. Chang into the dockeraddons directory

``` bash
cd ./dockeraddons
```

3. Deploy the docker containers

``` bash
docker-compose up -d
```

4. Call the setup

``` bash
docker exec dockeraddons_backend_1 node ./setup/init.js
```

## Developing

To rebuild the app delete the old containers.

``` bash
docker-compose down
```

And then start the containers agin with a forced rebuild.

``` bash
docker-compose up -d --build
```

## NOTES

1. To get access to the test routs add DEBUG=true to the environment vars
