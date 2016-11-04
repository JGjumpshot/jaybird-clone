angular.module('jaybirdApp').controller('accessoriesCtrl', function($scope, mainService) {
  $scope.getAccessories = function() {
    console.log('holla');
    mainService.getAccessories('accessory').then(function(response) {
      console.log(response);
      $scope.accessories = response;
    })
  }
  $scope.getAccessories();
})
