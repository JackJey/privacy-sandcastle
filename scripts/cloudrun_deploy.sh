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
project_name="gtech-privacy-sandcastle-dev";

services=$(cat <<EOT
  home
  news
  shop
  travel
  dsp
  ssp
EOT
)

# TODO: CloudRun doesn't support .env file, so grab values here and merge into single variable
ENV_VARS=$(cat ./containers/.env | grep -v "#" | grep -v "^PORT=" | sed '/^$/d' | tr "\n" ",")
echo ${ENV_VARS}

# setup Google Cloud SDK project
gcloud config set project ${project_name}
gcloud config get-value project

# make the default region us-central1
gcloud config set run/region us-central1

# Containerize app  with Cloud Build and upload it to Container Registry
# gcloud builds submit demo/ --tag gcr.io/${project_name}/demo

# Deploy the container image to Cloud Run
# gcloud run deploy demo --image gcr.io/${project_name}/demo:latest --platform managed --region us-central1 --memory 512Mi

# Fetch the service URL
# gcloud run services describe demo --format 'value(status.url)'

# Cloud Build
for service in $services; do
  echo https://${project_name}-${service}.web.app/

  ## push docker image
  # docker push gcr.io/${project_name}/${service}

  # Containerize app  with Cloud Build and upload it to Container Registry
  #gcloud builds submit containers/servers/${service} --tag gcr.io/${project_name}/${service}
done

  ## deploy cloud run 1 by 1 because of different cpu/memory or min-instance requirements
  # add "--min-instances 1" to have your service always on (cpu and memory billing will go up accordingly)

  #gcloud run deploy ${service} --image gcr.io/${project_name}/${service}:latest --platform managed --region us-central1 --min-instances 1
  gcloud run deploy home --image gcr.io/${project_name}/home:latest --platform managed --region us-central1 --memory 512Mi --set-env-vars "${ENV_VARS}"
  gcloud run deploy news --image gcr.io/${project_name}/news:latest --platform managed --region us-central1 --memory 512Mi --set-env-vars "${ENV_VARS}"
  gcloud run deploy shop --image gcr.io/${project_name}/shop:latest --platform managed --region us-central1 --memory 1024Mi --set-env-vars "${ENV_VARS}"
  gcloud run deploy travel --image gcr.io/${project_name}/travel:latest --platform managed --region us-central1 --memory 512Mi --set-env-vars "${ENV_VARS}"
  gcloud run deploy ssp --image gcr.io/${project_name}/ssp:latest --platform managed --region us-central1 --memory 512Mi --set-env-vars "${ENV_VARS}"
  gcloud run deploy dsp --image gcr.io/${project_name}/dsp:latest --platform managed --region us-central1 --memory 512Mi --set-env-vars "${ENV_VARS}"


# Print Cloud Run URL
for service in $services; do
  gcloud run services describe ${service} --format 'value(status.url)'
done



