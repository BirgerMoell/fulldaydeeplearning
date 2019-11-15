#!/bin/bash
# Deploy to cloud run

# Make the script print what is running:
set -ex

# gcloud auth login
gcloud auth configure-docker
gcloud config set project momentum-project
APP_DOCKER_IMAGE=gcr.io/momentum-project/spam-classifier
docker build -t $APP_DOCKER_IMAGE .
docker push $APP_DOCKER_IMAGE
gcloud beta run deploy fullday --project momentum-project --image $APP_DOCKER_IMAGE --region us-central1 --platform managed --memory 1024Mi
echo 'Also go to the google cloud console "cloud run", click show info panel, and create a new "allUsers" member with "cloud run invoker" permissions'
