#!/usr/bin/python

from scraper import Scraper
import sys
import getopt

HELP_HINT = 'scrape.py -v <inputvideo>'

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
        caption_scraper = Scraper()
        caption_scraper.scrape(video_id)
    else:
        print(HELP_HINT)

if __name__ == '__main__':
    main(sys.argv[1:])