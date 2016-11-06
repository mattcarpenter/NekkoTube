#!/usr/bin/python

from tinysegmenter import TinySegmenter
from .kakasi import Kakasi
from .dictionary import Dictionary
import urllib3
import urllib.parse
import bs4
from bs4 import BeautifulSoup
import re

reading_pattern = re.compile('【(.+)】')
definition_pattern = re.compile('(\(.+)')
word_pattern = re.compile('\s?([^\s]+)\s')
http = urllib3.PoolManager()

class CaptionParser:
    def __init__(self, raw_data):
        self.raw_data = raw_data

    def parse(self):

        raw_chunks = self.raw_data.split('\n\n')
        parsed_chunks = []

        for chunk in raw_chunks[1:]:
            chunk_lines = chunk.split('\n')
            time_range = chunk_lines[0]
            words = []
            dictionary_entries = []

            print('parsing chunk...')
            full_line = ''.join(chunk_lines[1:])

            # Run sentence through Japanese-English dictionary
            r = http.request('GET', 'http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic?9ZIG' + urllib.parse.quote(full_line, safe=''))
            html = r.data.decode('utf-8')
            soup = BeautifulSoup(html, 'html.parser')
            contents = soup.body.contents[1]

            # Tokenize
            for part in contents:
                if type(part) == bs4.element.NavigableString and part == '\n':
                    continue

                if type(part) == bs4.element.NavigableString:
                    words.append(part)

                if type(part) == bs4.element.Tag and part.contents[0] != '\n':
                    words.append(str(part.contents[0]))

            # Grab definitions
            for dictionary_line in [str(c.contents[0]) for c in contents.find_all('li')]:
                reading_search = reading_pattern.search(dictionary_line)
                definition_search = definition_pattern.search(dictionary_line)
                word_search = word_pattern.search(dictionary_line)
                try:
                    word = word_search.groups()[0]
                except:
                    word = ''
                try:
                    reading = reading_search.groups()[0]
                except:
                    reading = ''
                try:
                    definition = definition_search.groups()[0]
                except:
                    definition = ''

                dictionary_entries.append({
                    'word': word,
                    'reading': reading,
                    'definition': definition
                })

            """
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
            """
            parsed_chunks.append({
                'time_range': time_range,
                'words': words,
                'definitions': dictionary_entries
            })

        return parsed_chunks