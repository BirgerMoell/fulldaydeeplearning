# Presentation
docker build -t model .
docker run -ti -e FLASK_APP=deployment.py -e LC_ALL=C.UTF-8 -p 5000:5000 model flask run

# Deploy to cloud run
docker build -t gcr.io/momentum-project/spam-classifier .
docker push gcr.io/momentum-project/spam-classifier
gcloud beta run deploy fullday --project momentum-project --image $APP_DOCKER_IMAGE --region us-central1 --platform managed --memory 1024Mi

