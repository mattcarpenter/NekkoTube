# NekkoTube

## Getting Started

```
# Install Elasticsearch
> wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.0.0.zip
> unzip elasticsearch-5.0.0.zip
> cd elasticsearch-5.0.0
> bin/elasticsearch

# Install Mongodb (OSX)
> brew install mongodb

# Set up NekkoTube
> cd NekkoTube
> gunzip db/JMdict_e.gz db/
> export PYTHONPATH=.
> export FLASK_APP=nekkotube.py
> export FLASK_DEBUG=1
> flask run
```
