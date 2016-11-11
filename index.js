var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var massive = require('massive');
var config = require('./config.js');
var session = require('express-session')
var app = module.exports = express();

var port = 3000;

var connectionString = config.MASSIVE_URI //don't forget to name your database jaybird!
var db = massive.connectSync({connectionString: connectionString});
app.set('db', db);
var db = app.get('db'); //optional
var productsCtrl = require('./controllers/productsCtrl');
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(cors());

var UserCtrl = require('./controllers/UserCtrl');
var orderCtrl = require('./controllers/orderCtrl');

var passport = require('./services/passport');

var isAuthed = function(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401)
    .send();
    return next();
};

app.use(session({
  secret: config.SESSION_SECRET,
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport Endpoints //
app.post('/login', passport.authenticate('local', {
	successRedirect: '/me'
}));
app.get('/logout', function(req, res, next) {
	req.logout();
	return res.status(200)
		.send('logged out');
});

// User Endpoints //
app.post('/register', UserCtrl.register);
app.get('/user', UserCtrl.read);
app.get('/me', isAuthed, UserCtrl.me);
app.put('/user/:_id', isAuthed, UserCtrl.update);

//productsCtrl
app.get('/product/:productId', productsCtrl.getOne);
app.get('/product/type/:producttype', productsCtrl.getByType);
//test stuff in postman!!!
app.post('/profile/cart/:cartid', productsCtrl.addToCart);
app.get('/profile/getCart/:userid', orderCtrl.getCart);
app.get('/profile/getProductsByCartId/:cartid', productsCtrl.getByCartId)
app.delete('/profile/deleteById/:id', productsCtrl.deleteById)
app.listen(port, function() {
  console.log('nailed it on port ' + port);
})
