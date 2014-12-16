var yast         = require('yast-lib');
var errorHandler = require('../lib-error-handler');

function info(req, res){
	yast.user.info(req.credentials).then(function(info){
		res.json(info);
	})
	.catch(errorHandler(req, res));
}

function updatePassword(req, res){
	var newPassword = req.body.newPassword;

	yast.user.updatePassword(newPassword, req.credentials).then(function(){
		res.status(204).end();
	})
	.catch(errorHandler(req, res));
}

module.exports = {
	info: info,
	updatePassword: updatePassword
};