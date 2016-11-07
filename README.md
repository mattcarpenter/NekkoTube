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
> git clone https://github.com/mattcarpenter/nekkotube.git
> git clone https://github.com/leoboiko/myougiden
> cd myougiden/bin
> ./updatedb-myougiden -f
# todo: instructions for copying sqlite3 db

> export PYTHONPATH=.
> export FLASK_APP=nekkotube.py
> export FLASK_DEBUG=1
> flask run
```
