#!/usr/bin/python

import sqlite3

conn = sqlite3.connect('db/jmdict.sqlite')

class Dictionary:
    def lookup(self, word):
        c = conn.cursor()
        ent_seq = None
        definitions = []

        for reading_row in c.execute('SELECT ent_seq FROM readings WHERE reading=\'おいしい\' ORDER BY frequent ASC'):
            ent_seq = reading_row[0]

        if ent_seq is None:
            for kanji_row in c.execute('SELECT * FROM kanjis WHERE kanji=\'BLEH\' ORDER BY frequent ASC'):
                ent_seq = kanji_row[0]

        if ent_seq is not None:
            for glosses_row in c.execute('SELECT g.gloss, s.pos FROM glosses g LEFT JOIN senses s ON g.ent_seq = s.ent_seq WHERE g.ent_seq=' + str(int(ent_seq))):
                definitions.append(glosses_row)
        
        return definitions
