# Privacy Sandbox Demos

A use case demo for [Privacy Sandbox APIs](https://developer.chrome.com/en/docs/privacy-sandbox/).

## Motivation

[Privacy Sandbox](https://privacysandbox.com/) is proposing a large set of APIs to fulfil the diverse requirements of the digital advertising ecosystem. Publishers, advertisers, and other intermediaries in the adtech ecosystem have started to evaluate and plan how they will continue to provide a free and open internet while maintaining people's privacy.

Adtech businesses are looking for solutions to typical use cases that they have previously implemented with third-party cookies. These use cases frequently necessitate the use of a combination of multiple Privacy Sandbox APIs, which adds some complexity.

## Goals

Privacy Sandbox Demos will provide cookbook recipes, sample code, and demo applications for the major adtech use cases, based on Privacy Sandbox APIs. This is intended to support adtech companies and developers in quickly adapting their businesses and applications to a web ecosystem without third-party cookies.

Privacy Sandbox Demos is available as source code, container images, and scripts. We provide instructions for deploying and running it in your local environment using Docker runtime, as well as instructions for deploying it on Google Cloud Platform. We are also providing hosted instances at https://privacy-sandbox-demos-home.dev to let you start learning and experimenting quickly.

## Scope of current release

| **Use Case**                        | **Description**                                                                                      | **APIs**                             |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------ |
| Remarking                           | ads retargeting after visiting an online shopping site                                               | Protected Audience <br> Fenced Frame |
| Single-touch conversion Attribution | track conversion after seeing and ads on a news site and buying a project on an online shopping site | Attribution Reporting API            |
