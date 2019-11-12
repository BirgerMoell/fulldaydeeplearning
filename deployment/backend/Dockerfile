FROM ubuntu:18.04

RUN apt-get update -y && \
    apt-get install -y python-pip python-dev

# We copy just the requirements.txt first to leverage Docker cache
COPY ./requirements.txt /app/requirements.txt

# We create an app folder inside the docker container
# Which will contain our serve
WORKDIR /app

RUN pip install -r requirements.txt

# We copy our local directory to the docker container
COPY . /app

ENTRYPOINT [ "FLASK_APP=deployment.py flask run" ]
