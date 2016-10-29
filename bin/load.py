#!/usr/bin/python

from loader import Loader
import sys
import getopt

HELP_HINT = 'load.py -v <inputvideo>'

def main(argv):
    video_id = ''

    try:
        opts, args = getopt.getopt(argv, 'v:', ['video='])
    except getopt.GetoptError:
        print(HELP_HINT)
        sys.exit(2)

    for opt, arg in opts:
        if opt == '-v':
            video_id = arg

    if len(video_id) > 0:
        video_loader = Loader()
        video_loader.load(video_id)
    else:
        print(HELP_HINT)

if __name__ == '__main__':
    main(sys.argv[1:])