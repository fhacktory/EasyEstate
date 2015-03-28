$ ->
  console.log "START EASYESTATE"
  window.map = L.map('map').setView([
    45.7505
    4.8409
  ], 13)

  L.tileLayer('//{s}.tile.osm.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    maxZoom: 18).addTo window.map

  location_collection = new LocationCollection
  setting_collection = new  SettingCollection
  #advert_collection = new  AdvertCollection

  location_collection.on 'sync', (collection) ->
    window.location_collection = collection.models

  setting_collection.on 'sync', (collection) ->
    window.setting_collection = collection.models

  # advert_collection.on 'sync', (collection) ->
  #   window.advert_collection = collection.models

  app = new AppView(location_collection, setting_collection, 'advert_collection')
