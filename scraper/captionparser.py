#!/usr/bin/python

from tinysegmenter import TinySegmenter
from .kakasi import Kakasi

class CaptionParser:
    def __init__(self, raw_data):
        self.raw_data = raw_data

    def parse(self):
        statement = '私はpython大好きStanding Engineerです．'
        tokenized_statement = TinySegmenter().tokenize(statement)
        print(tokenized_statement)
        k = Kakasi()
        inverted = k.parse_tokens(tokenized_statement)
        print(inverted)