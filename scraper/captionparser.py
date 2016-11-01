#!/usr/bin/python

from tinysegmenter import TinySegmenter
from .kakasi import Kakasi

class CaptionParser:
    def __init__(self, raw_data):
        self.raw_data = raw_data

    def parse(self):
        raw_chunks = self.raw_data.split('\n\n')
        parsed_chunks = []

        for chunk in raw_chunks[1:]:
            chunk_lines = chunk.split('\n')
            time_range = chunk_lines[0]
            original_lines = []
            inverted_lines = []

            print('parsing chunk...')

            for chunk_line in chunk_lines[1:]:
                tokens = TinySegmenter().tokenize(chunk_line)
                original_lines.append(' '.join([token.strip() for token in tokens]))
                inverted_lines.append(' '.join([token.strip() for token in Kakasi().invert_tokens(tokens)]))

            parsed_chunks.append({
                'time_range': time_range,
                'original_lines': original_lines,
                'inverted_lines': inverted_lines
            })

        print(parsed_chunks)