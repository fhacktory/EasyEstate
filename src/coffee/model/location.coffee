Location = Backbone.Model.extend(
  defaults: ->
    zipcode: 0
    amenities: []
    lat: 0
    long: 0
    bbox: []

  initialize: ->
    return
)

LocationCollection = Backbone.Firebase.Collection.extend(
  model: Location
  url: '//fiery-fire-2189.firebaseio.com/amenities'
)
