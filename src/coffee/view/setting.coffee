SettingView = Backbone.View.extend(
  tagName: 'li'

  template: _.template("<%= name %>")

  initialize: ->
    @listenTo @model, 'change', @render
    return

  render: ->
    @$el.html @template(@model.toJSON())
    this
)
