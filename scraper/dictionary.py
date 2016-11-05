#!/usr/bin/python

import sqlite3

conn = sqlite3.connect('db/jmdict.sqlite')

class Dictionary:
    def lookup(self, word):
        c = conn.cursor()
        reading_entries = []
        definitions = []

        for reading_row in c.execute('SELECT ent_seq FROM readings WHERE reading=\'' + word + '\' ORDER BY frequent DESC'):
            reading_entries.append(reading_row[0])

        if len(reading_entries) > 0:
            # No matching Kanji. Use first reading entry
            found_entry = reading_entries[0]
        else:
            # No match
            return

        for glosses_row in c.execute('SELECT g.gloss, s.pos FROM glosses g INNER JOIN senses s ON g.sense_id = s.sense_id WHERE g.ent_seq=' + str(int(found_entry))):
            definitions.append(glosses_row)

        return definitions[:3]
