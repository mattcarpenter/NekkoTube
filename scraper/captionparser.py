#!/usr/bin/python

from tinysegmenter import TinySegmenter
from .kakasi import Kakasi
from .dictionary import Dictionary

particles = {'は','か','が','に','の','は','に','へ','を','と','や','など','も','も','に','に','で','と','の','から','より','まで','くらい','ほど','ばかり','で','か','を','を','に','に','に','と','と いう','とか','で','と','より','より','くらい','ほど','か','も','に','をする','でも','でも','で','から','に','は','が','を','で','で','だけ','だけ','で','でも','も','でも','ばかり','ばかり','ところ','が','から','ながら','が','の','から','ので','の','の','なら','なら','と','ば','ばいい','ば','たら','たら','ところ','ても','ても','ても','ては','のみ','まで','さえ','さえ','のに','ながら','とか','たり','たり','のに','のです','きり','きり','とも','ながら','しか','しかない','し','し','とも','に','か','か','だの','だの','など','やら','やら','ても','とも','は','と','など','くらい','ほど','ほど','だけ','だけ','と','と','なり','なり','こそ','こそ','ては','に','に','にしては','にとって','について','とも…とも','が','は','として','として','ばかりでなく','だけ','のみ','なり','がはやいか','やいなや','かないうちに','ばかり','ばかりに','すら','など','とも','ともあろうひと','どころか','だけに','までもない','ものの','ところで','けれども','けれども','が','けれども','ね','ね','ね','ねえ','よ','よ','かしら','かな','な','な','なあ','なあ','の','わ','さ','こと','こと','もの','とも','ものか','や','たら','やら','ぜ','ぞ'}
def is_particle(str):
    return True if str in particles else False

def get_sec(time_str):
    h, m, s = time_str.split(':')
    return float(h) * 3600 + float(m) * 60 + float(s)

class CaptionParser:
    def __init__(self, raw_data):
        self.raw_data = raw_data

    def parse(self):

        raw_chunks = self.raw_data.split('\n\n')
        parsed_chunks = []

        for chunk in raw_chunks[1:]:
            chunk_lines = chunk.split('\n')

            if len(chunk_lines[0]) == 0:
                continue

            time_range_parts = chunk_lines[0].split(',')
            start = get_sec(time_range_parts[0])
            end = get_sec(time_range_parts[1])

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
            definitions = [{ 'word': token, 'senses': Dictionary().lookup(token), 'particle': is_particle(token) } for token in str_inverted_tokens.split(' ')]

            parsed_chunks.append({
                'start': start,
                'end': end,
                'original': original,
                'inverted': inverted,
                'definitions': definitions
            })

        return parsed_chunks