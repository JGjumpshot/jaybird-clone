angular.module('jaybirdApp').controller('productsCtrl', function($scope, $state, mainService, product) {
  $scope.id = $state.params.id;
  // $state.go('products'+$scope.id);
  // console.log($scope.id);
  console.log("you got it: ", product);
  console.log($scope.product);
  $scope.product = product.product[0];
  $scope.styles = product.style;
  $scope.qty = 1;
  $scope.selectedStyle = '';
  
  $scope.qty = 1;
  $scope.addToCart = mainService.addToCart(productid);
  //make GET function , connect to service and get all products, save response on scope
  //at the end of this function (){}()
  //outside, make for loop that goes over the saved response and cuts the last 4 and puts them into a new array

})
