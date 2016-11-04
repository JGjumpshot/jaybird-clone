angular.module('jaybirdApp').service('mainService', function($http) {
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


})
