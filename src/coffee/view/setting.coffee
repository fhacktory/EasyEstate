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
    #console.log window.location_collection

    for loc in location_collection
      v = loc.attributes.nodes[@model.attributes.osm_key]
      #L.geoJson().addTo(window.map);
      count = Object.keys(v).length
      compute_midle_lat = loc.attributes.bbox.n - (loc.attributes.bbox.n - loc.attributes.bbox.s)/2
      compute_midle_lng = loc.attributes.bbox.e - (loc.attributes.bbox.e - loc.attributes.bbox.w)/2
      L.popup()
        .setLatLng([compute_midle_lat, compute_midle_lng])
        .setContent(count + " " + @model.attributes.name + " in " + loc.attributes.id)
        .addTo(window.map)

    console.log   + " is set to " + e.currentTarget.checked

  initialize: () ->
    @listenTo @model, 'change', @render
    return

  render: ->
    @$el.html @template(@model.toJSON())
    this
)
