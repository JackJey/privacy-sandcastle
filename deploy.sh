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
  gcloud run deploy sandcastle-${host} --image gcr.io/privacy-sandcastle-${host}/sandcastle_${host}:latest --platform managed --region asia-northeast1

  # Firebase Hosting
  ## change project
  firebase use ${host}
  ## deploy
  firebase deploy
done