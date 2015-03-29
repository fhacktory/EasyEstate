app.controller("IndexCtrl", function($scope, $firebaseObject, $firebaseArray, $timeout) {
  var settings = new Firebase("//fiery-fire-2189.firebaseio.com/settings");
  var adverts = new Firebase("//fiery-fire-2189.firebaseio.com/adverts");
  var amenities = new Firebase("//fiery-fire-2189.firebaseio.com/amenities");
  var layers = L.layerGroup();

  $scope.loading = true;
  $scope.checked = {};
  $scope.best_districts = [];
  $scope.prices = {};

  adverts.on("value", function(snapshot) {
    $timeout(function() {
      $scope.adverts = snapshot.val();
      $scope.loading = false;
    });
  });

  $scope.amenities_number = {};

  $scope.priceToInt = function(price) {
    return parseInt(price.replace(/\s+/g, '').split('€')[0]);
  };

  $scope.sizeToInt = function(size) {
    return parseInt(size.replace(/\s+/g, '').split('m')[0]);
  };

  $scope.addLayer = function(setting) {
    var amenities_number = {};
    if (setting.osm_key == 'price') {
      amenities_number = $scope.prices;
    } else {
      amenities_number = $scope.amenities_number[setting.osm_key];
    }

    var make_color = function(current, invert) {
      if (invert === undefined) invert = false;
      var max = amenities_number[$scope.best_districts[0]];
      var min = amenities_number[$scope.best_districts[$scope.best_districts.length - 1]];

      if (min === undefined) { min = 0; }
      if (max === undefined) { max = 0; }
      if (current === undefined) { current = 0; }
      return parseInt((current - min) * 255 / (max - min));
    };

    for (var key in $scope.amenities) {
      var amenity = $scope.amenities[key];
      var toDisplay = ((amenities_number === undefined) || amenities_number[key] === undefined) ? "0" : amenities_number[key];
      if (typeof toDisplay == "number" && toDisplay % 1 !== 0) {
        toDisplay = toDisplay.toFixed(2);
      }
      var layer = L.geoJson(amenity.polygon, {
        color: "rgb(75, "+ make_color(toDisplay, setting.osm_key === 'price') +", 0)",
        weight: 5,
        fillOpacity: 0.80,
        opacity: 0.80,
      });
      layer.bindPopup(toDisplay + " " + setting.name +  " in  " + key);
      layers.addLayer(layer);
    }
  };

  $scope.setBestDistrict = function(osm_key) {
    var amenities_number = {};
    if (osm_key == "price") {
      amenities_number = $scope.prices;
      $scope.best_districts = Object.keys(amenities_number).sort(function(a, b) {
        return amenities_number[a] - amenities_number[b];
      });
    } else {
      amenities_number = $scope.amenities_number[osm_key];
      $scope.best_districts = Object.keys(amenities_number).sort(function(a, b) {
        return amenities_number[b] - amenities_number[a];
      });
    }
  };

  amenities.on("value", function(snapshot) {
    $timeout(function() {
      $scope.amenities = snapshot.val();
      for (var key in snapshot.val()) {
        var amenity = snapshot.val()[key];
        $scope.prices[key] = amenity.price;
        for (var node in amenity.nodes) {
          if (!$scope.amenities_number[node]) {
            $scope.amenities_number[node] = {};
          }
          $scope.amenities_number[node][key] = Object.keys(amenity.nodes[node]).length;
        }
      }
    });
  });

  $scope.checkbox = {};
  $scope.map = undefined;

  $scope.updateSetting = function(setting) {
    if (!$scope.checked[setting.osm_key]) {
      $scope.checked = {};
      $scope.checked[setting.osm_key] = true;
    } else {
      $scope.checked[setting.osm_key] = false;
    }
    $scope.best_districts = [];
    layers.clearLayers();
    if ($scope.checked[setting.osm_key]) {
      $scope.setBestDistrict(setting.osm_key);
      $scope.addLayer(setting);
    }
  };

  (function() {
    $scope.map = L.map('map').setView([45.7505, 4.8409], 12)

    L.tileLayer('//{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="//osm.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo($scope.map);
    layers.addTo($scope.map);
    $scope.settings = $firebaseObject(settings);
  })();
});
