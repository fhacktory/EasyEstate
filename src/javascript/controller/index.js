app.controller("IndexCtrl", function($scope, $firebaseObject) {
  var settings = new Firebase("https://fiery-fire-2189.firebaseio.com/settings");
  /* var adverts = new Firebase("https://fiery-fire-2189.firebaseio.com/adverts");
  var amenities = new Firebase("https://fiery-fire-2189.firebaseio.com/amenities"); */

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
    
    $scope.settings = $firebaseObject(settings);
  })();
});
