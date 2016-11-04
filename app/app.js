angular.module("jaybirdApp", ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  $stateProvider
  .state('home', {
    url: '/',
    controller: 'homeCtrl',
    templateUrl: './app/home/home.html'
  })
  .state('products', {
    url: '/products/:id',
    controller: 'productsCtrl',
    templateUrl: './app/products/products.html',
    resolve: {
      product: function(mainService, $stateParams) {
        return mainService.getOne($stateParams.id);
      }
    }
  })
  // .state('products/freedom', {
  //   url: '/products/freedom',
  //   controller: 'freedomCtrl',
  //   templateUrl: './products/freedom/freedom.html'
  // })
  // .state('products/x3', {
  //   url: '/products/x3',
  //   controller: 'x3Ctrl',
  //   templateUrl: './products/x3/x3.html'
  // })
  .state('accessories', {
    url: '/accessories',
    controller: 'accessoriesCtrl',
    templateUrl: './app/accessories/accessories.html'
  })
})
