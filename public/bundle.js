angular.module('jaybirdApp', ['ui.router'])
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
      user: ["authService", "$state", function(authService, $state) {
        return authService.getCurrentUser()
        .then(function(response) {
          if (!response.data)
            $state.go('login');
          return response.data;
        })
        .catch(function(err) {
          $state.go('login');
        });
      }]
    }
  });
}]);

angular.module('jaybirdApp').controller('accessoriesCtrl', ["$scope", "mainService", "$state", function($scope, mainService, $state) {
  // console.log($state.params.id);
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

angular.module('jaybirdApp').controller('loginCtrl', ["$scope", "authService", "$state", function($scope, authService, $state) {
  $scope.login = function(user) {
    authService.login(user).then(function(response) {
      if(!response.data) {
        alert('User does not exist');
        $scope.user.password = '';
      }
      else {
        $state.go('profile'); // necessary?
      }
    }).catch(function(err) {
      alert('Unable to login');
    });
  };

  $scope.register = function(user) {
    authService.registerUser(user).then(function(response) {
      console.log('loginCtrl', user);
      if (!response.data) {
        alert('Unable to create user');
      }
      else {
        alert('User Created');
        $scope.newUser = {};
      }
    }).catch(function(err) {
      alert('Unable to create user');
    });
  };
}]);

angular.module('jaybirdApp').controller('productsCtrl', ["$scope", "$state", "mainService", "product", "localStorageServ", function($scope, $state, mainService, product, localStorageServ) {
  $scope.id = $state.params.id;
  // $state.go('products'+$scope.id);
  // console.log($scope.id);
  console.log("you got it: ", product);
  // console.log($scope.product);
  $scope.product = product.product[0];
  $scope.styles = product.style;
  $scope.qty = 1;
  $scope.selectedStyle = '';

  // $scope.qty = 1;
  $scope.addToCart = function(product, qty, style) {
    if (!style) {
      return alert('Please select a style');
    }
    var cart = localStorageServ.get('cart')
    if (!cart) {
      cart = [];
    }
    cart.push({product: product, qty: qty, style: style});
    localStorageServ.store('cart', cart);

  };
  //make GET function , connect to service and get all products, save response on scope
  //at the end of this function (){}()
  //outside, make for loop that goes over the saved response and cuts the last 4 and puts them into a new array

}]);

angular.module('jaybirdApp').controller('profileCtrl', ["$scope", "user", "mainService", "localStorageServ", function($scope, user, mainService, localStorageServ) { //inject user
  $scope.user = user;
  $scope.getProducts = function() {
    mainService.getProductsByCartId($scope.cart.orderid).then(function(response) {
      $scope.products = response.data;
    });
  }

  // Add each item from cart array into products_in_order table
  $scope.addToCart = function(productid, qty, styleid) {
    console.log($scope.cart.orderid);
    mainService.addToCart($scope.cart.orderid, styleid, productid, qty).then(function(response) {
      console.log(response);
    });
  }
  // Get cart from local storage
  $scope.grabFromStorage = function() {
    $scope.localCart = localStorageServ.get('cart');

    if (!$scope.localCart) {
      $scope.localCart = [];
    }
    for (var i = 0; i < $scope.localCart.length; i++) {
      console.log($scope.localCart[i]);
      var productInfo = $scope.localCart[i];
      $scope.addToCart(productInfo.product.productid,productInfo.qty,productInfo.style.styleid);
    }
    localStorageServ.store('cart', []);
    $scope.getProducts();
  }
  // Get the users cart by the user id
  $scope.getCart = function() {
    console.log(user);
    mainService.getCart(user.userid).then(function(response) {
      console.log(response.data);
      $scope.cart = response.data[0];
      $scope.grabFromStorage();
    });
  }
$scope.getCart();


  // set cart in local storage to []
}]);

angular.module('jaybirdApp').service('authService', ["$http", function($http) {

  this.login = function(user) {
    return $http({
      method: 'POST',
      url: '/login',
      data: user
    }).then(function(response) {
      return response;
    });
  };

  this.logout = function() {
    return $http({
      method: 'GET',
      url: '/logout'
    }).then(function(response) {
      return response;
    });
  };

  this.getCurrentUser = function() {
    return $http({
      method: 'GET',
      url: '/me'
    }).then(function(response) {
      return response;
    });
  };

  this.registerUser = function(user) {
    console.log('authService', user);
    return $http({
      method: 'POST',
      url: '/register',
      data: user
    }).then(function(response) {
      return response;
    });
  };

  this.editUser = function(id, user) {
    return $http({
      method: 'PUT',
      url: '/user/' + id,
      data: user
    }).then(function(response) {
      return response;
    });
  };
}]);

// INITILIZE SERVICE
// ============================================================
angular.module('jaybirdApp').service('localStorageServ', ["$http", function($http) {
    this.store = function(name, data) {
      localStorage.setItem(name, JSON.stringify(data));
      return 'saved';
    };
    this.get = function(name) {
      var item = localStorage.getItem(name);
      return JSON.parse(item);
    };
  }]);

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

  this.addToCart = function(cartid, styleid, productid, qty) {
    return $http({
      method: 'POST',
      url: '/profile/cart/' + cartid,
      data: {
        style: styleid,
        id: productid,
        qty: qty
      }
    }).then(function(response) {
      return response.data;
    })
  }

  this.getCart = function(userid) {
    return $http({
      method: 'GET',
      url: '/profile/getCart/' + userid
    })
  }

  this.getProductsByCartId = function(cartid) {
    return $http({
      method: 'GET',
      url: '/profile/getProductsByCartId/' + cartid
    })
  }

}])

angular.module('jaybirdApp').service('userService', ["$http", function($http) {

  this.getUsers = function() {
    return $http({
      method: 'GET',
      url: '/user'
    }).then(function(response) {
      return response;
    });
  };

  this.getUser = function(id) {
    return $http({
      method: 'GET',
      url: '/user?_id=' + id
    }).then(function(response) {
      return response;
    });
  };
}]);
