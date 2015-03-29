app.controller("IndexCtrl", function($scope, $firebaseObject, $firebaseArray, $timeout) {
  var settings = new Firebase("//fiery-fire-2189.firebaseio.com/settings");
  var adverts = new Firebase("//fiery-fire-2189.firebaseio.com/adverts");
  var amenities = new Firebase("//fiery-fire-2189.firebaseio.com/amenities");

  adverts.on("value", function(snapshot) {
    $timeout(function() {
      $scope.adverts = snapshot.val();
    });
  });

  $scope.amenities_number = {};

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
        L.geoJson(amenity.polygon, {
          color: "rgb(75, 125, 0)",
          weight: 5,
          fillOpacity: 0.90,
          opacity: 0.90,
        }).addTo($scope.map);
      }
    });
  });

  $scope.layers = {};
  $scope.map = undefined;

  $scope.updateSetting = function(osm_key) {
    if ($scope.layers[osm_key] === null) {
      // Add the layer on the map
      $scope.layers[osm_key] = "map";
    } else {
      // Remove the layer from the map
      $scope.layers[osm_key] = null;
    }
  };

  (function() {
    $scope.map = L.map('map').setView([45.7505, 4.8409], 13)

    L.tileLayer('//{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="//osm.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo($scope.map);

    $scope.settings = $firebaseObject(settings);
  })();
});
