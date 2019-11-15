FROM ubuntu:18.04

RUN apt-get update -y && \
    apt-get install -y python3-pip python3-dev

# We copy just the requirements.txt first to leverage Docker cache
COPY ./requirements.txt /app/requirements.txt

# We create an app folder inside the docker image
# Which will contain our server
WORKDIR /app

RUN pip3 install -r requirements.txt

# We copy our local directory to the image app folder
COPY . ./

# Development version of the flask app
# CMD python3 app.py

# Run the gunicorn production deployment for the flask app
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 app:app
