SettingView = Backbone.View.extend(
  tagName: 'li'

  template: _.template("
    <div class='checkbox'>
      <label>
        <input type='checkbox'> <%= name %>
      </label>
    </div>")

  events:
    "click input[type=checkbox]": "doChecked"

  doChecked: (e) ->
    stats = {}
    heat_map =
      hot:
        color: "#ff7800"
        weight: 5
        opacity: 0.65

    console.log window.location_collection

    if e.currentTarget.checked
      for loc in location_collection
        v = loc.attributes.nodes[@model.attributes.osm_key]
        if v
          stats[loc.attributes.id] = Object.keys(v).length

      stats = Object.keys(stats).sort(
        (a,b) ->
          return stats[b] - stats[a]
      )

      for loc in location_collection
        L.geoJson(loc.attributes.polygon, heat_map.hot).addTo(window.map);

        compute_midle_lat = loc.attributes.bbox.n - (loc.attributes.bbox.n - loc.attributes.bbox.s)/2
        compute_midle_lng = loc.attributes.bbox.e - (loc.attributes.bbox.e - loc.attributes.bbox.w)/2

    else
      console.log "Removing layers"
      for i in window.map._layers
        console.log i
        window.map.removeLayer(i)

    console.log   + " is set to " + e.currentTarget.checked

  initialize: () ->
    @listenTo @model, 'change', @render
    return

  render: ->
    @$el.html @template(@model.toJSON())
    this
)
