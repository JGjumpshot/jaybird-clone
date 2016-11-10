var app = require('../index.js')
var db = app.get('db');
module.exports = {
  getCart: function(req, res, next) {
    var id = req.params.userid;
    db.get_cart([id], function(err, cart) {
      console.log(err, cart);
      res.status(200).json(cart);
    })
  }
}
