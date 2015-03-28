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
    console.log window.location_collection

    for loc in location_collection
      v = loc.attributes.nodes[@model.attributes.osm_key]
      console.log Object.keys(v).length

    console.log  @model.attributes.name + " is set to " + e.currentTarget.checked

  initialize: () ->
    @listenTo @model, 'change', @render
    return

  render: ->
    @$el.html @template(@model.toJSON())
    this
)
