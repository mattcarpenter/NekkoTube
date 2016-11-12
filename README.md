# NekoTube

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

# Set up NekoTube
> git clone https://github.com/mattcarpenter/nekotube.git
> cd nekotube/db
> gunzip jmdict.sqlite.gz
> cd ../scraper

# Create a client_secrets.json file inside the scraper directory for the YouTube data API.
# You'll need to create a client id and OAuth client secret.
# https://developers.google.com/api-client-library/python/guide/aaa_client_secrets
# https://console.developers.google.com/apis/

# Run Flask
> cd ~/repos/nekotube/
> export PYTHONPATH=.
> export FLASK_APP=nekotube.py
> export FLASK_DEBUG=1
> flask run
```
