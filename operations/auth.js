var yast         = require('yast-lib');
var errorHandler = require('../lib-error-handler');

function login(req, res){
	var user = req.body.username;
	var password = req.body.password;

	yast.auth.login(user, password).then(function(response){
		res.json(response);
	})
	.catch(errorHandler(req, res));
}

module.exports.login = login;