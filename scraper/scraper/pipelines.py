# -*- coding: utf-8 -*-
import firebase

class ScraperPipeline(object):
    def __init__(self):
        self.firebase = firebase.FirebaseApplication('https://fiery-fire-2189.firebaseio.com', None)

    def process_item(self, item, spider):
        self.firebase.post_async('/adverts', item.to_json(), {'print': 'silent'})
        return item
