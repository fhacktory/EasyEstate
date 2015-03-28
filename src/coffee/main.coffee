$ ->
  console.log "START EASYESTATE"
  map = L.map('map').setView([
    45.7505
    4.8409
  ], 13)

  L.tileLayer('//{s}.tile.osm.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    maxZoom: 18).addTo map

  app = new AppView()
