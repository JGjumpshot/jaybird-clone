angular.module('jaybirdApp').controller('productsCtrl', function($scope, $state, mainService, product) {
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

})
