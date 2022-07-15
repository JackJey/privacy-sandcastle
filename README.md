# Project Sandcastle v0

Privacy Sandbox Mixed DEMO

## Motivation

- there are many API in Privacy Sandbox Family and has individual DEMO for each API
- merging them into a single demo will show how they work in the real world.

## Target API

- Included in v0
  - Attribution Reporting - CTC
  - Topic API
  - FLEDGE
  - FencedFrame
  - Trust Token
- Not Included in v0
  - Attribution Reporting - VTC
  - IP Blindness
  - Privacy Budget
  - Attribution: app-to-web (could be in v1 though!)
  - Attribution: aggregate

## Release Plan

- v1: 2022/Q3 (OT with  ARA, FLEDGE, FencedFrame, Topics)

## Use Case

- Online Shopping Advertising: FLEDGE / FLoC
- VTC / CTC measurement: Attribution
- Anti Fraud: Trust Token
- Display Ad: Fenced Frame
- Anti Fingerprint: IP Blindness / (UA  Reduction) / Privacy Budget

## Locally Runnable

- Some issue filed in demo repo about "How to run it locally".
- It's better for developers to run a demo on localhost or on their own server.
- How
  - assign some domain for demo like `advertizer.example`, `news.example`
  - adding the list to `/etc/hosts` or `--host-resolver-rules`
    - https://chromium.googlesource.com/chromium/src/+/master/net/dns/README.md
    - `--host-resolver-rules="MAP * 127.0.0.1"`

