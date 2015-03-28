# -*- coding: utf-8 -*-

import scrapy

class Advert(scrapy.Item):
    title = scrapy.Field()
    link = scrapy.Field()
    price = scrapy.Field()
    size = scrapy.Field()
    city = scrapy.Field()
    zipcode = scrapy.Field()
    address = scrapy.Field()
    pictures = scrapy.Field()

    def to_json(self):
        return {
            "title": self.get("title"),
            "link": self.get("link"),
            "price": self.get("price"),
            "size": self.get("size"),
            "city": self.get("city"),
            "zipcode": self.get("zipcode"),
            "pictures": self.get("pictures"),
            "address": self.get("address")
        }
