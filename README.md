# NekkoTube

## Getting Started

Requires Python 3.5.0

```
# Install Elasticsearch
> wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.0.0.zip
> unzip elasticsearch-5.0.0.zip
> cd elasticsearch-5.0.0
> bin/elasticsearch

# Install Mongodb (OSX)
> brew install mongodb

# Set up NekkoTube
> git clone https://github.com/mattcarpenter/nekkotube.git
> git clone https://github.com/leoboiko/myougiden
> cd myougiden
> python setup.py install
> cd bin
> ./updatedb-myougiden -f

# sqlite japanese dictionary db is copied to the 'share/myougiden/' directory in your Python path
# e.g. /Users/mcarpenter/.pyenv/versions/3.5.0/share/myougiden/
> cp jmdict_e.sqlite ~/repos/jmdict.sqlite

# Create a client_secrets.json file inside the scraper directory for the YouTube data API.
# You'll need to create a client id and OAuth client secret.
# https://developers.google.com/api-client-library/python/guide/aaa_client_secrets
# https://console.developers.google.com/apis/

# Run Flask
> cd ~/repos/NekkoTube/
> export PYTHONPATH=.
> export FLASK_APP=nekkotube.py
> export FLASK_DEBUG=1
> flask run
```
