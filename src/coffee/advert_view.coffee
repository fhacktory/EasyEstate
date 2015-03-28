AdvertView = Backbone.View.extend(
    tagName: 'tr'
    template: _.template("
          <td><img class='img-responsive' src='<%= pictures[0] %>'/></td>
          <td><%= title %></td>
          <td><%= size %></td>
          <td><a href='<%= link %>'>Link</a></td>
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
