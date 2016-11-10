angular.module('jaybirdApp', ['ui.router'])
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
  .state('accessories', {
    url: '/accessories',
    controller: 'accessoriesCtrl',
    templateUrl: './app/accessories/accessories.html'
  })
  .state('login', {
    url: '/login',
    controller: 'loginCtrl',
    templateUrl: './app/login/loginTmpl.html'
  })
  .state('profile', {
    url: '/profile',
    controller: 'profileCtrl',
    templateUrl: './app/profile/profileTmpl.html',
    resolve: {
      user: function(authService, $state) {
        return authService.getCurrentUser()
        .then(function(response) {
          if (!response.data)
            $state.go('login');
          return response.data;
        })
        .catch(function(err) {
          $state.go('login');
        });
      }
    }
  });
});
