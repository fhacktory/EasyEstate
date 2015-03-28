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
    console.log  @model.attributes.name + " is set to " + e.currentTarget.checked

  initialize: ->
    @listenTo @model, 'change', @render
    return

  render: ->
    @$el.html @template(@model.toJSON())
    this
)
