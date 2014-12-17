var yast = require('yast-lib');
var btoa = require('btoa');

function login(req, res, next){
	var user = req.body.username;
	var password = req.body.password;

	yast.auth.login(user, password).then(function(response){
		var credentials = {
			user: user,
			hash: response.hash
		};
		res.json({api_key: btoa(JSON.stringify(credentials))});
	})
	.catch(next);
}

module.exports.post = login;