app.controller("IndexCtrl", function($scope, $firebaseArray) {
  var settings = new Firebase("//fiery-fire-2189.firebaseio.com/settings");
  var adverts = new Firebase("//fiery-fire-2189.firebaseio.com/adverts");
  var amenities = new Firebase("//fiery-fire-2189.firebaseio.com/amenities");

  $scope.settings = $firebaseArray(settings);

  $scope.limited_adverts = $firebaseArray(adverts.limitToLast(25));
  console.log($scope.limited_adverts)

  $scope.data = {};

  (function() {
    /*
    * Entry point of the controller.
    */
    $scope.map = L.map('map').setView([45.7505, 4.8409], 13)
    L.tileLayer('//{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="//osm.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo($scope.map);

  })();
});
