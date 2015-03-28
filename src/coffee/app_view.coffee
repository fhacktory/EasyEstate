AppView = Backbone.View.extend(
    el: $('#app')

    initialize: ->
        @table = $("#adverts-table")
        @listenTo @collection, 'add', @addOne
        return

    addOne: (ad) ->
        view = new AdvertView(model: ad)
        @table.append view.render().el
        return
)
