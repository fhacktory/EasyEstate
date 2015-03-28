Setting = Backbone.Model.extend(
  defaults: ->
    osm_key: ''
    name: ''
    enable: false

  initialize: ->
    return
)

SettingCollection = Backbone.Firebase.Collection.extend(
  model: Setting
  url: '//fiery-fire-2189.firebaseio.com/settings'
)
