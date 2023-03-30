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

# parameters
firebase_hosting_domain="privacy-sandcastle-dev";

services=$(cat <<EOT
  home
  news
  shop
  travel
  dsp
  ssp
EOT
)

# Deploy to Firebase hosting all sites
for service in $services; do
  firebase deploy --only hosting:${service}
done

# Firebase Hosting : check all sites
for service in $services; do
  printf https://${firebase_hosting_domain}-${service}.web.app/

  ## cleanup cache
  curl -X PURGE https://${firebase_hosting_domain}-${service}.web.app/

  printf "\n"
done
