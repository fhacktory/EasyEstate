Advert = Backbone.Model.extend(
  defaults: ->
    title: 'No title'
    size:  0
    link: ''
    price: 0
    city: ''
    zipcode: ''
    address: ''
    pictures: []

  initialize: ->
    return
)

AdvertCollection = Backbone.Firebase.Collection.extend(
  model: Advert
  url: '//fiery-fire-2189.firebaseio.com/adverts'
)
