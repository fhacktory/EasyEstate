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

    console.log window.location_collection

    if e.currentTarget.checked
      for loc in location_collection
        v = loc.attributes.nodes[@model.attributes.osm_key]
        if v
          stats[loc.attributes.id] = Object.keys(v).length

      stats_sorted = Object.keys(stats).sort(
        (a,b) ->
          return stats[b] - stats[a]
      )

      for loc in location_collection
        for ss, i in stats_sorted
          if ss == loc.attributes.id
            intensity = Math.round(((i+1)*255)/(location_collection.length+1))
            console.log intensity

        L.geoJson(loc.attributes.polygon,
          color: "rgb(75, "+intensity+", 0)"
          weight: 5
          fillOpacity: 0.90
          opacity: 0.90
        ).addTo(window.map);

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
