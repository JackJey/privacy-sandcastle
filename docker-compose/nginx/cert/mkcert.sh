#!/usr/bin/env bash

cat ../../.devcontainer/.env | \
  grep HOST | \
  cut -d'=' -f2 | \
  xargs -I{} mkcert {}
