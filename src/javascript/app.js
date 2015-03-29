var app = angular.module("app", ["ngRoute", "firebase"]);

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl: "index.html",
    controller: "IndexCtrl"
  })
  .otherwise({redirectTo: '/'});
});
