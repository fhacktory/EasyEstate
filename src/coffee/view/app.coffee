AppView = Backbone.View.extend(
  el: $('#app')

  initialize: ->
    @advert_el = $("#adverts-table")
    @setting_el = $("#settings-list")
    @location_el = $("#location")

    @listenTo new LocationCollection, 'add', @addLoc
    @listenTo new SettingCollection, 'add', @addSet
    @listenTo new AdvertCollection, 'add', @addAd
    return

  addLoc: (loc) ->
    view = new LocationView(model: loc)
    @location_el.append view.render().el
    return

  addSet: (set) ->
    view = new SettingView(model: set)
    @setting_el.append view.render().el
    return

  addAd: (ad) ->
    view = new AdvertView(model: ad)
    @advert_el.append view.render().el
    return
)
