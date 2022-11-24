# Project Sandcastle v0

Privacy Sandbox Mixed DEMO

It's been deployed on https://privacy-sandcastle-home.web.app.

(Google Internal Only: See design docs at [go/privacy-sandcastle](go/privacy-sandcastle)).

## Motivation

- there are many API in Privacy Sandbox Family and has individual DEMO for each API
- merging them into a single demo will show how they work in the real world.

## Target API

- Scope of v0
  - Attribution Reporting - CTC
  - Attribution Reporting - VTC
  - FLEDGE
  - FencedFrame
  - Topic API
- v1 ~ later
  - Private State Token
  - IP Blindness
  - Privacy Budget
  - Attribution: app-to-web (could be in v1 though!)
  - Attribution: aggregate

## Release Plan

- v0: 2022/Q4 (OT with ARA, FLEDGE, FencedFrame, Topics)

## Use Case

- Online Shopping Advertising: FLEDGE / FLoC
- VTC / CTC measurement: Attribution
- Anti Fraud: Private State Token
- Display Ad: Fenced Frame
- Anti Fingerprint: IP Blindness / (UA Reduction) / Privacy Budget

## How to run locally

### PreRequirement

Install dependencies below

- [Docker](https://docs.docker.com/engine/install/)
- [mkcert](https://github.com/FiloSottile/mkcert)
- [Nodejs v18](https://nodejs.org/)

Make sure install mkcert local CA into system store.

```
$ mkcert -install
```

### Build & Run

Clone and just exec npm script.

```sh
$ git clone https://github.com/JackJey/privacy-sandcastle
$ cd privacy-sandcastle
$ npm install
$ npm start
```

### Structure

Each services are developed under servers, and composed by docker-compose.

```
.
|-- README.md
|-- docker-compose
|   |-- .env
|   |-- docker-compose.yml
|   |-- nginx
|   |   |-- cert
|   |   `-- nginx.conf
|   `-- servers
|       |-- dsp
|       |-- home
|       |-- news
|       |-- shop
|       |-- ssp
|       `-- travel
`-- package.json
```

If you wanna add new services, follow instructions below.

- add service dir uder servers.
- decide domain and append in `docker-compose/.env`
- develop it and encapsulate in Dokcer
- update `docker-compose.yml` && `nginx.conf`

You can implement new service in any technology stack basically. But from point of view for maintainance. Recommended stacks are listed below.

- Simple static site, JSON API
  - Express + Ejs + TypeScript + Tailwind
  - Vanilla JS (or TS) on client side
- SPA
  - Next.js + TypeScript + Tailwind
- 3rd Party Tag Script
  - Express + Vanilla JS

## Container

Every servers has Dockerfile and `./docker-compose/docker-comopse.yml` merge every servers in container.

`.env` defines hostname/port for each services and Nginx will proxy every request based on hsotname.

```
Client ->req-> Nginx
                  |-- home:5000
                  |-- news:5010
                  |-- ...
```

## Host & Port

URL is so important in Privacy Sandbox APIs, so the demo could not rely on local url such as `http://localhost:3000`.

In this project, every service should has real domain & valid certificate, so the services could access via URL like below.

- https://privacy-sandcastle-home.web.app
- https://privacy-sandcastle-shop.web.app
- ...

For solving hostname to IP address, you should add domain list to `/etc/hosts` on your local machine.

```
# Privacy Sandcastle
127.0.0.1	privacy-sandcastle-home.web.app
127.0.0.1	privacy-sandcastle-news.web.app
127.0.0.1	privacy-sandcastle-shop.web.app
127.0.0.1	privacy-sandcastle-travel.web.app
127.0.0.1	privacy-sandcastle-dsp.web.app
127.0.0.1	privacy-sandcastle-ssp.web.app
```

If you use Google Chrome, `--host-resolver-rules` flag can be use instead.

```
$ google_chrome `--host-resolver-rules="MAP * 127.0.0.1"`
```

`https://` requires valid certificate too, this is done by `mkcert` as mentiones above.

`mkcert -install` installs develop CA cert into your local machine, so every https cert which nginx uses are valid on your browser.

Lastly, you should use `80` for `http://` and `443` for `https://`. It is done by use `sudo` when starting `docker-compose`. Or adding permission to your user (ex. adding user to `admin` role) will omit it.

## Deploy

For register `.web.app` to each services, empty project created on Firebase Hosting and forward every request to Firebase Hosting will forwarded to Cloud Run.

Following command will register each container image to GCR and deploy it on Cloud Run.

```
$ npm run deploy
```
