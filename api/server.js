try{
	var env = require('./config/env_dev');
}
catch(err){
	var env = require('./config/env_prod');
}

var models = require("./models");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

//app config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + './../app/'));

//route configuration
var init = require('./routes/init');
var user_routes = require('./routes/user_routes');
var product_routes = require('./routes/product_routes');
var order_routes = require('./routes/order_routes');

//set Routes
app.use('/api/init',init);
app.use('/api/users',user_routes);
app.use('/api/products',product_routes);
app.use('/api/orders',order_routes);


//start server and database
models.sequelize.sync().then(function(){
	app.listen(env.port,function(){
		console.log('Listening on '+env.host+':'+env.port);
		console.log('Stop Server With CTRL + C');
	});
})
