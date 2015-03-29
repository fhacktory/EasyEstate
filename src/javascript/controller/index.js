app.controller("IndexCtrl", function($scope, $firebaseObject, $firebaseArray, $timeout) {
  var settings = new Firebase("//fiery-fire-2189.firebaseio.com/settings");
  var adverts = new Firebase("//fiery-fire-2189.firebaseio.com/adverts");
  var amenities = new Firebase("//fiery-fire-2189.firebaseio.com/amenities");

  $scope.settings = $firebaseArray(settings);

  $scope.limited_adverts = $firebaseArray(adverts.limitToLast(25));
  console.log($scope.limited_adverts)

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

    amenities.on("value", function(snapshot) {
      $timeout(function() {
        $scope.amenities = snapshot.val();
        for (var i = 0; i < $scope.amenities.length; i++) {
          L.geoJson($scope.amenities[i].polygon, {
            color: "rgb(75, 125, 0)",
            weight: 5,
            fillOpacity: 0.90,
            opacity: 0.90
          }).addTo($scope.map);
        }
      });
    });
  })();
});
