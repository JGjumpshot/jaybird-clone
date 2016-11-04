angular.module("jaybirdApp", ['ui.router'])
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
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
      product: ["mainService", "$stateParams", function(mainService, $stateParams) {
        return mainService.getOne($stateParams.id);
      }]
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
}])

angular.module('jaybirdApp').controller('accessoriesCtrl', ["$scope", "mainService", function($scope, mainService) {
  $scope.getAccessories = function() {
    console.log('holla');
    mainService.getAccessories('accessory').then(function(response) {
      console.log(response);
      $scope.accessories = response;
    })
  }
  $scope.getAccessories();
}])


angular.module('jaybirdApp').controller('homeCtrl', ["$scope", function($scope) {
  $scope.showVid = false;
}])

angular.module('jaybirdApp').directive('footerDirective', function() {
  return {
    restrict: 'AE',
    templateUrl: './app/directives/footer.html'
  }
})

angular.module('jaybirdApp').directive('freedomDirective', function() {
  return {
    restrict: 'AE',
    templateUrl: './app/directives/freedom.html'
  }
})

angular.module('jaybirdApp').directive('headerDirective', function() {
  return {
    restrict: 'AE',
    templateUrl: './app/directives/header.html'
  }
})

angular.module('jaybirdApp').directive('x3Directive', function() {
  return {
    restrict: 'AE',
    templateUrl: './app/directives/x3.html'
  }
})

angular.module('jaybirdApp').controller('productsCtrl', ["$scope", "$state", "mainService", "product", function($scope, $state, mainService, product) {
  $scope.id = $state.params.id;
  console.log("you got it: ", product);
  console.log($scope.product);
  $scope.product = product.product[0];
  $scope.styles = product.style;
  $scope.qty = 1;
  $scope.selectedStyle = '';
  //make GET function , connect to service and get all products, save response on scope
  //at the end of this function (){}()
  //outside, make for loop that goes over the saved response and cuts the last 4 and puts them into a new array

}])

angular.module('jaybirdApp').service('mainService', ["$http", function($http) {
  this.getOne = function(id) { //function getting from database
    return $http({ //http call from database
      method: 'GET',
      url: '/product/' + id
    }).then(function(response){ //promise receiving asynchronus data
        console.log("made request", response);
        return response.data; //response
      });
  }
  this.getAccessories = function(producttype) {
    return $http({
        method: 'GET',
        url: '/product/type/' + producttype
      }).then(function(response) {
        return response.data;
      })
  }


}])
