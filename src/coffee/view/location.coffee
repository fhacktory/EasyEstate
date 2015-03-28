LocationView = Backbone.View.extend(
  tagName: 'option'

  template: _.template("<%= id %>")

  initialize: ->
    @listenTo @model, 'change', @render
    return

  events:
    "click #location": "doSelect"

  doSelect: (e) ->
    console.log e

  render: ->
    @$el.html @template(@model.toJSON())
    this
)
