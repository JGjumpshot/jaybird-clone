angular.module("jaybirdApp", ['ui.router'])
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  $stateProvider
  .state('home', {
    url: '/',
    controller: 'homeCtrl',
    templateUrl: './home/home.html'
  })
  .state('accessories', {
    url: '/accessories',
    controller: 'accessoriesCtrl',
    templateUrl: './accessories/accessories.html'
  })
}])



angular.module('jaybirdApp').directive('footerDirective', function() {
  return {
    restrict: 'AE',
    templateUrl: './directives/footer.html'
  }
})

angular.module('jaybirdApp').directive('headerDirective', function() {
  return {
    restrict: 'AE',
    templateUrl: './directives/header.html'
  }
})

angular.module('jaybirdApp').controller('homeCtrl', ["$scope", function($scope) {
  $scope.showVid = false;
}])
