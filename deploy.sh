# Copyright 2022 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

#/usr/bin/env zsh

hosts=$(cat <<EOT
  home
  news
  shop
  travel
  dsp
  ssp
EOT
)

for host in $hosts; do
  echo https://privacy-sandcastle-${host}.web.app/
  # GCP
  ## change gcp project
  gcloud config set project privacy-sandcastle-${host}
  gcloud config get-value project
  ## push docker image
  docker push gcr.io/privacy-sandcastle-${host}/sandcastle_${host}
  ## deploy cloud run
  gcloud run deploy sandcastle-${host} --image gcr.io/privacy-sandcastle-${host}/sandcastle_${host}:latest --platform managed --region asia-northeast1 --min-instances 1

  # Firebase Hosting
  ## cleanup cache
  curl -X PURGE https://privacy-sandcastle-${host}.web.app/
  ## change project
  npx --package firebase-tools firebase -c containers/servers/${host}/firebase.json use ${host}
  ## deploy
  npx --package firebase-tools firebase -c containers/servers/${host}/firebase.json deploy
done