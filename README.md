# Privacy Sandcastle

A use case demo for [Privacy Sandbox APIs](https://developer.chrome.com/en/docs/privacy-sandbox/).

## Motivation

[Privacy Sandbox](https://privacysandbox.com/) is proposing a large set of APIs to fulfil the diverse requirements of the digital advertising ecosystem. Publishers, advertisers, and other intermediaries in the adtech ecosystem have started to evaluate and plan how they will continue to provide a free and open internet while maintaining people's privacy.

Adtech businesses are looking for solutions to typical use cases that they have previously implemented with third-party cookies. These use cases frequently necessitate the use of a combination of multiple Privacy Sandbox APIs, which adds some complexity.

## Goals

Privacy Sandcastle will provide cookbook recipes, sample code, and demo applications for the major adtech use cases, based on Privacy Sandbox APIs. This is intended to support adtech companies and developers in quickly adapting their businesses and applications to a web ecosystem without third-party cookies.

Privacy Sandcastle is available as source code, container images, and scripts. We provide instructions for deploying and running it in your local environment using Docker runtime, as well as instructions for deploying it on Google Cloud Platform. We are also providing hosted instances at https://privacy-sandcastle-home.web.app to let you start learning and experimenting quickly.

## Scope of current release

| **Use Case** | **Description** | **APIs** |
| Remarking | ads retargeting after visiting an online shopping site | FLEDGE <br> Fenced Frame |
| Single-touch conversion Attribution | track conversion after seeing and ads on a news site and buying a project on an online shopping site | Attribution Reporting API |

# Local environment deployment guide

## Prerequisites

These instructions are given for Linux environments and assume you have the following packages installed on your system and your user is in the sudoers list (can execute commands with root access using sudo). If you plan to contribute to the code, a GitHub account is also required to commit your change and/or make pull requests.

The following packages must be installed

- [docker](https://docs.docker.com/engine/install/)
- [docker-compose](https://docs.docker.com/compose/install/)
- [nodejs v18](https://nodejs.org/)
- [mkcert](https://github.com/FiloSottile/mkcert)

## Network Setup

### Domain Name / URL

Privacy Sandbox APIs use the domain name in the URL (site origin) to allow/block cross site data sharing, identify topics etc. Thus we cannot rely only on the "localhost" domain for development.

We will remap domain name to loopback address (127.0.0.1) so each service could be accessed via a URL like :

- https://privacy-sandcastle-home.web.app
- https://privacy-sandcastle-shop.web.app
- …

There are 2 ways to achieve that

1. **Remap hosts to loopback address by editing /etc/hosts on your local machine**

Edit `/etc/hosts` file

```
# /etc/hosts
127.0.0.1	privacy-sandcastle.web.app
127.0.0.1	privacy-sandcastle-home.web.app
127.0.0.1	privacy-sandcastle-dsp.web.app
127.0.0.1	privacy-sandcastle-shop.web.app
127.0.0.1	privacy-sandcastle-travel.web.app
127.0.0.1	privacy-sandcastle-ssp.web.app
127.0.0.1	privacy-sandcastle-news.web.app
```

Verifying mapping with :

```shell
nslookup privacy-sandcastle-news.web.app
```

If the mapping isn’t reflected in Chrome, try clearing your DNS cache

`chrome://net-internals/#dns`

2. **If you use Google Chrome, --host-resolver-rules flag can be used instead.**

Start Google chrome with the following argument

```shell
google_chrome --host-resolver-rules="MAP privacy-sandcastle-* 127.0.0.1"
```

### HTTP SSL Certificate

`https://` scheme requires a valid certificate for your browser, this is done by using mkcert to create a local certification authority that will be trusted by your local browser. Later we will be creating a certificate for each of the privacy sandcastle service and configure nginx to serve those certificates.

Run the command below to create the development Certificate Authority:

```shell
mkcert -install
```

## Build & Run your local development environment

1. Fork https://github.com/JackJey/privacy-sandcastle and clone locally
2. Setting up with npm scripts

```shell-session
# Download packages and dependencies :
$ npm install

# Generate the SSL Certificates for Nginx proxy service :
$ npm run cert

# Build and run the docker containers (docker must be run with root permission) :
$ sudo npm run start
```

3. Open the home page: https://privacy-sandcastle-home.web.app

# Google Cloud Platform project deployment guide

The instructions below allow you to deploy Privacy Sandcastle on a new Google Cloud Platform project.

The same instructions can be repeated to deploy a dev, staging, prod etc. environment to additional projects.

Project names and variables in _italic_ must be carefully chosen and updated to suit your project naming convention.

Resources : https://firebase.google.com/docs/hosting/cloud-run

## Prepare your Google Cloud Platform Billing Account

If you don’t have yet a billing account, follow the documentation to Create a Google Cloud Platform Billing Account : https://cloud.google.com/billing/docs/how-to/manage-billing-account

## Prepare your Google Cloud Platform Project

1. Create a Google Cloud Platform Project : https://cloud.google.com/resource-manager/docs/creating-managing-projects
   1. Note the name of the project/id. E.g.: _privacy-sandcastle_
   2. Assign the billing account created in step above
2. Add a Firebase Project linked to your GCP Project : https://console.firebase.google.com/
   1. Click "Add Project"
   2. Select the GCP project you previously created. E.g. : _privacy-sandcastle_
   3. Since you enabled Billing Account on this project, it will automatically select the Firebase pay-as-you-go plan
   4. Enable Google Analytics for the project : Select "Default Account for Firebase" unless you have specific analytics requirements

## Prepare your Development Environment for Firebase Hosting

In this section we will configure your development environment to get ready to build and deploy resources to Firebase. The Instructions below are based on the Linux environment.

1. Clone Privacy Sandcastle Git Repository : https://github.com/JackJey/privacy-sandcastle.git
2. Install the Firebase CLI : https://firebase.google.com/docs/cli#linux
3. Open a terminal at the root of the project. Login and test the Firebase CLI :

```shell-session
$ firebase login
$ firebase projects:list
```

4. Configure firebase to use your project (e.g. )

```shell
    1. firebase use --clear
    2. firebase use --unalias default
    3. firebase use --add
```

Resources :

- https://firebase.google.com/docs/hosting
- https://firebase.google.com/docs/hosting/multisites?authuser=0&hl=en#set_up_deploy_targets

## Setup Firebase Hosting Multiple Sites

Your firebase project will host 5 different sites to demonstrate the capabilities of Privacy Sandbox across the different actors of the adtech ecosystem :

- Home : Home page with the links to the different use-cases and scenario
- DSP : Demand Side Platform
- Shop & Travel : The advertiser shopping or travel site = Buy side. They are buying ad space from the publisher. Site embeds the DSP tags.
- SSP : Supply Side Platform
- News : Publisher site where ads will be displayed = Sell side. They are selling ad space to advertisers. Site embeds SSP tags

Each site will have a different domain name to simulate a real life adtech scenario

Open Firebase Hosting : from the Firebase console click on "hosting" or follow this link by replacing "_privacy-sandcastle_" with your project name

`https://firebase.corp.google.com/project/privacy-sandcastle/hosting/sites`

Click on "Add another site" and enter site-id following your naming standards. Replace _privacy-sandcastle_ with the domain of your choice. E.g.

- _privacy-sandcastle_-home
- _privacy-sandcastle_-dsp
- _privacy-sandcastle_-shop
- _privacy-sandcastle_-travel
- _privacy-sandcastle_-ssp
- _privacy-sandcastle_-news

Note, task above can be done programmatically with Firebase CLI :

```shell
firebase hosting:sites:create SITE_ID
```

E.g.

```shell
firebase hosting:sites:create privacy-sandcastle-home
firebase hosting:sites:create privacy-sandcastle-dsp
firebase hosting:sites:create privacy-sandcastle-shop
firebase hosting:sites:create privacy-sandcastle-travel
firebase hosting:sites:create privacy-sandcastle-ssp
firebase hosting:sites:create privacy-sandcastle-news
```

Set up deploy targets for your sites (When you have multiple sites and you run Firebase CLI deploy commands, the CLI needs a way to communicate which settings should be deployed to each site).

use the following command to setup deploy target for each hosting site :

```shell
firebase target:apply hosting TARGET_NAME RESOURCE_IDENTIFIER
```

E.g. :

```shell
firebase target:apply hosting home privacy-sandcastle-home
firebase target:apply hosting dsp privacy-sandcastle-dsp
firebase target:apply hosting shop privacy-sandcastle-shop
firebase target:apply hosting ssp privacy-sandcastle-ssp
firebase target:apply hosting news privacy-sandcastle-news
firebase target:apply hosting travel privacy-sandcastle-travel
```

Adding hosting sites and deploy targets can be done using the provided script :

```shell
scripts/firebase_setup
```

Note that you will have to change the **firebase_hosting_domain** variable to match yours :

```shell
firebase_hosting_domain="privacy-sandcastle";
```

The firebase hosting configuration for each site is already defined for you in the <code>firebase.json</code></strong> file.

## Google Cloud Platform Logging and Monitoring

We recommend to Enable Cloud Logging for Firebase Hosting Project.

By using Cloud Logging with your Firebase Hosting sites, you allow web request logs to be exported to Cloud Logging.

Access the following URL (replace _privacy-sandcastle_ with your project name)

https://firebase.corp.google.com/project/privacy-sandcastle/settings/integrations/cloudlogging

Select all the sites you want to export logs from, click Save and Finish.

## Install Google Cloud SDK & Enable the Google Cloud Run API

Next we will deploy containers to Cloud Run to run the content of the demo sites.

We chose to deploy everything container based for portability and flexibility and we use Firebase hosting as a frontend solution for HTTPS request handling, domain name and ssl certificates.

Install Google Cloud SDK : If Google Cloud SDK is not installed on the machine, follow instructions here : https://cloud.google.com/sdk/docs/install#linux

Initialize Google Cloud SDK : https://cloud.google.com/sdk/docs/initializing

```shell
# Run `gcloud init` to setup authentication and project
gcloud init

# Or alternatively run separately the 2 commands :
gcloud auth login
gcloud config set project

# Verify your configuration (account and project) with the command :
gcloud config list

# Enable Cloud Run API
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com

# Setup the default region for deployment
gcloud config set run/region us-central1
```

Resources : https://firebase.google.com/docs/hosting/cloud-run

## Deploy all Cloud Run services and Firebase Sites

Once you have confirmed you can deploy a sample demo application on Cloud Run and access it from Firebase hosting site, you are ready to deploy all the services and hosting sites.

Edit `services/.env` file to match the `${SERVICE}_HOST` parameter to your firebase hosting domain e.g. : `privacy-sandcastle-${SERVICE}.web.app`

```shell
# services/.env

# External Port (bind by Nginx)
EXTERNAL_PORT=443

# Bind by each Application Server (fixed value)
PORT=8080

# home
HOME_HOST=privacy-sandcastle-home.web.app
HOME_TOKEN=""
HOME_DETAIL="Home page of Privacy Sandcastle"

# Publisher
## news
NEWS_HOST=privacy-sandcastle-news.web.app
NEWS_TOKEN=""
NEWS_DETAIL="Publisher: News media site"

...
```

On the same file `services/.env` update the Origin Trial token on dsp and ssp service to match yours

```shell
# Adtech
## dsp
DSP_HOST=privacy-sandcastle-dsp.web.app
DSP_TOKEN="xxxxx"
DSP_DETAIL="Ad-Platform: DSP for advertiser"

## ssp
SSP_HOST=privacy-sandcastle-ssp.web.app
SSP_TOKEN="xxxxx"
SSP_DETAIL="Ad-Platform: SSP for publisher"
```

Edit "**project_name**" variable value and execute `./scripts/cloudrun_deploy.sh` to build and deploy services with Cloud Build and deploy to Cloud Run.

```shell
# cloudrun_deploy.sh

#/usr/bin/env zsh

# parameters
project_name="privacy-sandcastle";

...
```

Now edit the "**firebase_hosting_domain"** variable with your own domain and execute `./scripts/firebase_deploy.sh` to deploy Firebase hosting sites and configuration.

```shell
# firebase_deploy.sh

#/usr/bin/env zsh

# parameters
firebase_hosting_domain="privacy-sandcastle";

...
```

Look at the output, and verify you can access all the sites your created :

E.g. :

- https://_privacy-sandcastle_.web.app/
- https://_privacy-sandcastle_-home.web.app/
- https://_privacy-sandcastle_-dsp.web.app/
- https://_privacy-sandcastle_-shop.web.app/
- https://_privacy-sandcastle_-travel.web.app/
- https://_privacy-sandcastle_-ssp.web.app/
- https://_privacy-sandcastle_-news.web.app/
