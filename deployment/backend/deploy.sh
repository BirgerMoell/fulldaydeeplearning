#!/bin/bash
# Deploy to cloud run
set -ex
gcloud auth configure-docker
APP_DOCKER_IMAGE=gcr.io/momentum-project/spam-classifier
gcloud config set project momentum-project
docker build -t $APP_DOCKER_IMAGE .
docker push $APP_DOCKER_IMAGE
gcloud beta run deploy fullday --project momentum-project --image $APP_DOCKER_IMAGE --region us-central1 --platform managed --memory 1024Mi
