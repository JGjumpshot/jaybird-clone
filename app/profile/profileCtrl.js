angular.module('jaybirdApp').controller('profileCtrl', function($scope, user, mainService, localStorageServ) { //inject user
  $scope.user = user;
  $scope.getProducts = function() {
    mainService.getProductsByCartId($scope.cart.orderid).then(function(response) {
      $scope.products = response.data;
      console.log($scope.products);
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

$scope.delete = function(id) {
  mainService.deleteById(id).then(function(response) {
    console.log(response.data);

  })
}

  // set cart in local storage to []
});
