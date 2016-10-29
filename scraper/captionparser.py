#!/usr/bin/python

from tinysegmenter import TinySegmenter
from jNlp.jTokenize import jTokenize

class CaptionParser:
    def __init__(self, raw_data):
        self.raw_data = raw_data

    def parse(self):
        statement = '私はpython大好きStanding Engineerです．'
        tokenized_statement = TinySegmenter().tokenize(statement)
        tokenized_statement_2 = jTokenize(statement)
        print(tokenized_statement)
        print(tokenized_statement_2)