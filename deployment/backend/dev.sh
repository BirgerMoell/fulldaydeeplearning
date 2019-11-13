# Presentation
set -ex
docker build -t model .
docker run -ti -e FLASK_APP=deployment.py -p 5000:5000 model python3 deployment.py
