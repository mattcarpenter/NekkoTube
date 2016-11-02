# NekkoTube

## Getting Started

```
> cd NekkoTube
> pip install install myougiden

# may need to add Python bin to $PATH for this to work
> updatedb-myougiden -f

> gunzip db/JMdict_e.gz db/
> export PYTHONPATH=.
> export FLASK_APP=nekkotube.py
> export FLASK_DEBUG=1
> flask run
```
