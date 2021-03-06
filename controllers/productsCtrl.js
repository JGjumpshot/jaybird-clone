var app = require('../index.js')
var db = app.get('db');
module.exports = {
  getOne: function(req, res, next) {
    var productData = {};
    db.get_product([req.params.productId], function(err, result) {
      console.log('product', err);
      productData.product = result;
      db.get_style_by_product_id([req.params.productId], function(err, result) {
        console.log('style', err);
        productData.style = result;
        res.status(200).json(productData);
      })
    })
  },
  getByType: function(req, res, next) {
    var type = req.params.producttype;
    db.get_product_by_type([type], function(err, products) {
      res.status(200).json(products);
    })
  },
  addToCart: function(req, res, next) {
    var product = req.body;
    db.add_to_cart([req.params.cartid, product.id, product.qty, product.style], function(err, productAdded) {
      console.log(err);
      res.status(200).json(productAdded);
    })
  },
  getByCartId: function(req, res, next) {
    var cartid = req.params.cartid;
    db.get_products_by_cartid([cartid], function(err, products) {
      console.log(err);

      res.status(200).json(products);
    })
  },
  deleteById: function(req, res, next) {
    db.remove_from_cart([req.params.id], function(err, deletion) {
      console.log(err);
      res.status(200).json(deletion)
    })
  }

}
