#!/usr/bin/python

from subprocess import Popen, PIPE, STDOUT
import os

class Kakasi:
    def parse_tokens(self, tokens):
        print(os.getcwd())
        p = Popen(
            ['java', '-Dkakasi.home=./bin', '-jar', 'bin/lib/kakasi.jar', '-JH', '-iUTF-8', '-oUTF-8'],
            stdout=PIPE,
            stderr=STDOUT,
            stdin=PIPE
        )

        #def parse_token(token):

        stdout, stderr = p.communicate(input='hello私'.encode('utf-8'))
        print(stdout.decode('utf-8'))

        #results = [parse_token(token) for token in tokens]

        #return results

