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

  this.deleteById = function(id) {
    return $http({
      method: 'DELETE',
      url: '/profile/deleteById/' + id
    })
  }

})
