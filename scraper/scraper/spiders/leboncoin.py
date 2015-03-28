# -*- coding: utf-8 -*-
import scrapy
import re
from scraper.items import Advert

LABELS = {
    u"Ville :": "city",
    u"Code postal :": "zipcode",
    u"Surface :": "size",
}

URL = "http://www.leboncoin.fr/locations/offres/ile_de_france/occasions/?o={}"
PATTERN = re.compile("http://.*\.jpg")

class LeboncoinSpider(scrapy.Spider):
    name = "leboncoin"
    allowed_domain = ["leboncoin.fr"]
    start_urls = [
        URL.format(1),
    ]

    def parse(self, response):
        while True:
            adverts = response.css(".list-lbc a")[:-1]
            for ad in adverts:
                link = ad.xpath('@href').extract()[0]
                yield scrapy.Request(link, callback=self.parse_advert)
            yield scrapy.Request(URL.format(int(response.url.split("=")[-1]) + 1), callback=self.parse)

    def parse_advert(self, response):
        advert = Advert()
        labels = map(
            unicode.strip,
            response.xpath("//table/tr/th/text()").extract()
        )
        datas = response.xpath("//table/tr/td/text()").extract()[1:]
        for key, value in dict(zip(labels, datas[:len(labels)])).items():
            if key in LABELS:
                advert[LABELS[key]] = value
        advert["title"] = response.xpath("//h2/text()").extract()[0]
        advert["link"] = response.url
        advert["price"] = response.xpath("//table/tr/td/span/text()").extract()[0]
        advert["pictures"] = []

        pictures = response.xpath("//div/a/span").css(".thumbs").extract()

        for picture in pictures:
            m = PATTERN.search(picture)
            if m:
                advert["pictures"].append(picture[m.start():m.end()])
        yield advert
