# Project Sandcastle v0

Privacy Sandbox Mixed DEMO

See more details in [go/privacy-sandcastle](go/privacy-sandcastle) (internal only).

## Motivation

- there are many API in Privacy Sandbox Family and has individual DEMO for each API
- merging them into a single demo will show how they work in the real world.

## Target API

- Scope of v0
  - Attribution Reporting - CTC
  - Topic API
  - FLEDGE
  - FencedFrame
  - Trust Token
- v1 ~ later
  - Attribution Reporting - VTC
  - IP Blindness
  - Privacy Budget
  - Attribution: app-to-web (could be in v1 though!)
  - Attribution: aggregate

## Release Plan

- v0: 2022/Q3 (OT with ARA, FLEDGE, FencedFrame, Topics)

## Use Case

- Online Shopping Advertising: FLEDGE / FLoC
- VTC / CTC measurement: Attribution
- Anti Fraud: Trust Token
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
$ npm start
```

`npm start` calls `mkcert` & `docker-compose` command inside, so you can do them manally.

```sh
$ cd docker-compose/nginx/cert
$ ./mkcert.sh
```

```sh
$ cd docker-compose/.devcontainer
$ docker-compose build
$ docker-compose up
```

### Structure

Each services are developed under servers, and composed by docker-compose.

```
.
|-- README.md
|-- docker-compose
|   |-- nginx
|   |   |-- cert # mkcert or let's encrypt certificate
|   |   `-- nginx.conf
|   `-- servers # each services in each docker
|       |-- dsp
|       |-- home
|       |-- news
|       |-- shop
|       |-- ssp
|       `-- travel
|-- package.json
```

If you wanna add new services, follow instructions below.

- add service dir uder servers.
- decide domain and append in `docker-compose/.devcontainer/.env`
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
