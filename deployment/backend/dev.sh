# Presentation
set -ex
docker build -t model .
docker run -ti -p 5000:5000 model python3 app/deployment.py
