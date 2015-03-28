# -*- coding: utf-8 -*-
import scrapy
from scraper.items import Advert

class LeboncoinSpider(scrapy.Spider):
    name = "leboncoin"
    allowed_domain = ["leboncoin.fr"]
    start_urls = [
        "http://www.leboncoin.fr/locations/offres/?f=a&th=1",
    ]

    def parse(self, response):
        yield Advert()
