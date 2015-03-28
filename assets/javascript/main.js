// Generated by CoffeeScript 1.7.1
(function() {
  var Advert, AdvertCollection, AdvertView, AppView, Location, LocationCollection, LocationView, Setting, SettingCollection, SettingView;

  $(function() {
    var app, location_collection, setting_collection;
    console.log("START EASYESTATE");
    window.map = L.map('map').setView([45.7505, 4.8409], 13);
    L.tileLayer('//{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(window.map);
    location_collection = new LocationCollection;
    setting_collection = new SettingCollection;
    location_collection.on('sync', function(collection) {
      return window.location_collection = collection.models;
    });
    setting_collection.on('sync', function(collection) {
      return window.setting_collection = collection.models;
    });
    return app = new AppView(location_collection, setting_collection, 'advert_collection');
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

  Location = Backbone.Model.extend({
    defaults: function() {
      return {
        zipcode: 0,
        amenities: [],
        lat: 0,
        lon: 0,
        bbox: [],
        polygon: {}
      };
    },
    initialize: function() {}
  });

  LocationCollection = Backbone.Firebase.Collection.extend({
    model: Location,
    url: '//fiery-fire-2189.firebaseio.com/amenities'
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
    initialize: function(l, s, a) {
      this.advert_el = $("#adverts-table");
      this.setting_el = $("#settings-list");
      this.location_el = $("#location");
      this.listenTo(l, 'add', this.addLoc);
      this.listenTo(s, 'add', this.addSet);
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

  LocationView = Backbone.View.extend({
    tagName: 'option',
    template: _.template("<%= id %>"),
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },
    events: {
      "change #location": "doSelect"
    },
    doSelect: function(e) {
      return console.log(e);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  SettingView = Backbone.View.extend({
    tagName: 'li',
    template: _.template("<div class='checkbox'> <label> <input type='checkbox'> <%= name %> </label> </div>"),
    events: {
      "click input[type=checkbox]": "doChecked"
    },
    doChecked: function(e) {
      var compute_midle_lat, compute_midle_lng, heat_map, i, loc, stats, v, _i, _j, _k, _len, _len1, _len2, _ref;
      stats = {};
      heat_map = {
        hot: {
          color: "#ff7800",
          weight: 5,
          opacity: 0.65
        }
      };
      console.log(window.location_collection);
      if (e.currentTarget.checked) {
        for (_i = 0, _len = location_collection.length; _i < _len; _i++) {
          loc = location_collection[_i];
          v = loc.attributes.nodes[this.model.attributes.osm_key];
          if (v) {
            stats[loc.attributes.id] = Object.keys(v).length;
          }
        }
        stats = Object.keys(stats).sort(function(a, b) {
          return stats[b] - stats[a];
        });
        for (_j = 0, _len1 = location_collection.length; _j < _len1; _j++) {
          loc = location_collection[_j];
          L.geoJson(loc.attributes.polygon, heat_map.hot).addTo(window.map);
          compute_midle_lat = loc.attributes.bbox.n - (loc.attributes.bbox.n - loc.attributes.bbox.s) / 2;
          compute_midle_lng = loc.attributes.bbox.e - (loc.attributes.bbox.e - loc.attributes.bbox.w) / 2;
        }
      } else {
        console.log("Removing layers");
        _ref = window.map._layers;
        for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
          i = _ref[_k];
          console.log(i);
          window.map.removeLayer(i);
        }
      }
      return console.log + " is set to " + e.currentTarget.checked;
    },
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

}).call(this);
