#/usr/bin/env zsh

docker push gcr.io/privacy-sandcastle/sandcastle_home
gcloud run deploy sandcastle-home --image gcr.io/privacy-sandcastle/sandcastle_home:latest --platform managed --region asia-northeast1
