# -*- coding: utf-8 -*-

import scrapy

class Advert(scrapy.Item):
    title = scrapy.Field()
    link = scrapy.Field()
    price = scrapy.Field()
    size = scrapy.Field()
    city = scrapy.Field()
    zipcode = scrapy.Field()
