app.controller("IndexCtrl", function($scope, $firebaseObject, $firebaseArray, $timeout) {
  var settings = new Firebase("//fiery-fire-2189.firebaseio.com/settings");
  var adverts = new Firebase("//fiery-fire-2189.firebaseio.com/adverts");
  var amenities = new Firebase("//fiery-fire-2189.firebaseio.com/amenities");
  var layers = L.layerGroup();

  $scope.checked = {};
  $scope.best_districts = [];

  adverts.on("value", function(snapshot) {
    $timeout(function() {
      $scope.adverts = snapshot.val();
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
    var amenities_number = $scope.amenities_number[setting.osm_key];
    console.log(amenities_number);
    for (var key in $scope.amenities) {
      var amenity = $scope.amenities[key];
      var toDisplay = ((amenities_number === undefined) || amenities_number[key] === undefined) ? "0" : amenities_number[key];
      layer = L.geoJson(amenity.polygon, {
        color: "rgb(75, "+ toDisplay +", 0)",
        weight: 5,
        fillOpacity: 0.90,
        opacity: 0.90,
      })
      layer.bindPopup(toDisplay + " " + setting.name +  " in  " + key);
      layers.addLayer(layer);
    }
  };

  $scope.setBestDistrict = function(osm_key) {
    var amenities_number = $scope.amenities_number[osm_key];
    $scope.best_districts = Object.keys(amenities_number).sort(function(a, b) {
      return amenities_number[b] - amenities_number[a];
    });
  };

  amenities.on("value", function(snapshot) {
    $timeout(function() {
      $scope.amenities = snapshot.val();
      for (var key in snapshot.val()) {
        var amenity = snapshot.val()[key];
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
      $scope.addLayer(setting);
      $scope.setBestDistrict(setting.osm_key);
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
