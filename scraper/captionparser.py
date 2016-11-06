#!/usr/bin/python

from tinysegmenter import TinySegmenter
from .kakasi import Kakasi
from .dictionary import Dictionary

class CaptionParser:
    def __init__(self, raw_data):
        self.raw_data = raw_data

    def parse(self):

        raw_chunks = self.raw_data.split('\n\n')
        parsed_chunks = []

        for chunk in raw_chunks[1:]:
            chunk_lines = chunk.split('\n')
            time_range = chunk_lines[0]

            print('parsing chunk...')
            chunk_line = ''.join(chunk_lines[1:])

            # split lines into words
            tokens = TinySegmenter().tokenize(chunk_line)

            # clean up whitespace, re-join using a single space, and push into original_lines
            original = ' '.join([token.strip() for token in tokens])

            # invert Kanji into Hiragana, re-join using a single space, and push into original lines
            str_inverted_tokens = Kakasi().invert(' '.join(tokens))
            inverted = str_inverted_tokens

            # translate
            definitions = [{'word': token, 'senses': Dictionary().lookup(token)} for token in str_inverted_tokens.split(' ')]

            parsed_chunks.append({
                'time_range': time_range,
                'original': original,
                'inverted': inverted,
                'definitions': definitions
            })

        return parsed_chunks