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
    console.log(size);
    return parseInt(size.replace(/\s+/g, '').split('m')[0]);
  };

  $scope.addLayer = function(osm_key) {
    var amenities_number = $scope.amenities_number[osm_key];
    for (var key in $scope.amenities) {
      var amenity = $scope.amenities[key];
      layers.addLayer(L.geoJson(amenity.polygon, {
        color: "rgb(75, "+ amenities_number[key]  +", 0)",
        weight: 5,
        fillOpacity: 0.90,
        opacity: 0.90,
      }));
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

  $scope.updateSetting = function(osm_key) {
    if (!$scope.checked[osm_key]) {
      $scope.checked = {};
      $scope.checked[osm_key] = true;
    } else {
      $scope.checked[osm_key] = false;
    }
    $scope.best_districts = [];
    layers.clearLayers();
    if ($scope.checked[osm_key]) {
      $scope.addLayer(osm_key);
      $scope.setBestDistrict(osm_key);
    }
  };

  (function() {
    $scope.map = L.map('map').setView([45.7505, 4.8409], 13)

    L.tileLayer('//{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="//osm.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo($scope.map);
    layers.addTo($scope.map);
    $scope.settings = $firebaseObject(settings);
  })();
});
