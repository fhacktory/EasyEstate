AdvertView = Backbone.View.extend(
    tagName: 'tr'
    template: _.template("
          <td><a href='<%= link %>'><img class='img-responsive' src='<%= pictures[0] %>' /></a></td>
          <td><%= title %></td>
          <td><%= size %></td>
          <td><%= price %></td>
          <td><%= city %></td>
          <td><%= zipcode %></td>")

    initialize: ->
        @listenTo @model, 'change', @render
        return

    render: ->
        @$el.html @template(@model.toJSON())
        this
)
