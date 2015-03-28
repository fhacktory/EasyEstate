// Generated by CoffeeScript 1.7.1
(function() {
  var Advert, AdvertCollection, AdvertView, AppView, Location, LocationCollection, LocationView, Setting, SettingCollection, SettingView;

  $(function() {
    var app, map;
    console.log("START EASYESTATE");
    map = L.map('map').setView([45.7505, 4.8409], 13);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(map);
    return app = new AppView();
  });

  Advert = Backbone.Model.extend({
    defaults: function() {
      return {
        title: 'No title',
        size: 0,
        link: '',
        price: 0,
        city: '',
        zipcode: '',
        address: '',
        pictures: []
      };
    },
    initialize: function() {}
  });

  AdvertCollection = Backbone.Firebase.Collection.extend({
    model: Advert,
    url: '//fiery-fire-2189.firebaseio.com/adverts'
  });

  Setting = Backbone.Model.extend({
    defaults: function() {
      return {
        osm_key: '',
        name: '',
        enable: false
      };
    },
    initialize: function() {}
  });

  SettingCollection = Backbone.Firebase.Collection.extend({
    model: Setting,
    url: '//fiery-fire-2189.firebaseio.com/settings'
  });

  AdvertView = Backbone.View.extend({
    tagName: 'tr',
    template: _.template("<td><a href='<%= link %>'><img class='img-responsive' src='<%= pictures[0] %>'/></a></td> <td><%= title %></td> <td><%= size %></td> <td><%= price %></td> <td><%= city %></td> <td><%= zipcode %></td>"),
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  AppView = Backbone.View.extend({
    el: $('#app'),
    initialize: function() {
      this.advert_el = $("#adverts-table");
      this.setting_el = $("#settings-list");
      this.location_el = $("#location");
      this.listenTo(new LocationCollection, 'add', this.addLoc);
      this.listenTo(new SettingCollection, 'add', this.addSet);
      this.listenTo(new AdvertCollection, 'add', this.addAd);
    },
    addLoc: function(loc) {
      var view;
      view = new LocationView({
        model: loc
      });
      this.location_el.append(view.render().el);
    },
    addSet: function(set) {
      var view;
      view = new SettingView({
        model: set
      });
      this.setting_el.append(view.render().el);
    },
    addAd: function(ad) {
      var view;
      view = new AdvertView({
        model: ad
      });
      this.advert_el.append(view.render().el);
    }
  });

  SettingView = Backbone.View.extend({
    tagName: 'li',
    template: _.template("<div class='checkbox'> <label> <input type='checkbox'> <%= name %> </label> </div>"),
    events: {
      "click input[type=checkbox]": "doChecked"
    },
    doChecked: function(e) {
      return console.log(this.model.attributes.name + " is set to " + e.currentTarget.checked);
    },
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  LocationView = Backbone.View.extend({
    tagName: 'option',
    template: _.template("<%= id %>"),
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },
    events: {
      "click #location": "doSelect"
    },
    doSelect: function(e) {
      return console.log(e);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  Location = Backbone.Model.extend({
    defaults: function() {
      return {
        zipcode: 0,
        amenities: [],
        lat: 0,
        long: 0,
        bbox: []
      };
    },
    initialize: function() {}
  });

  LocationCollection = Backbone.Firebase.Collection.extend({
    model: Location,
    url: '//fiery-fire-2189.firebaseio.com/amenities'
  });

}).call(this);
