# -*- coding: utf-8 -*-

BOT_NAME = 'scraper'

SPIDER_MODULES = ['scraper.spiders']
NEWSPIDER_MODULE = 'scraper.spiders'
ITEM_PIPELINES = [
    'scraper.pipelines.ScraperPipeline'
]
DOWNLOAD_DELAY = 0.25
