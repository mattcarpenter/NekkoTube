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
            original_lines = []
            inverted_lines = []
            definition_lines = []

            print('parsing chunk...')

            for chunk_line in chunk_lines[1:]:
                # split lines into words
                tokens = TinySegmenter().tokenize(chunk_line)

                # clean up whitespace, re-join using a single space, and push into original_lines
                original_lines.append(' '.join([token.strip() for token in tokens]))

                # invert Kanji into Hiragana, re-join using a single space, and push into original lines
                str_inverted_tokens = Kakasi().invert(' '.join(tokens))
                inverted_lines.append(str_inverted_tokens)

                # translate
                definition_lines.append([[Dictionary().lookup(token) for token in str_inverted_tokens.split(' ')]])

            parsed_chunks.append({
                'time_range': time_range,
                'original_lines': original_lines,
                'inverted_lines': inverted_lines,
                'definition_lines': definition_lines
            })

        return parsed_chunks