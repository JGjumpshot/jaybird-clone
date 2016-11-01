angular.module("jaybirdApp", ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
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
})
