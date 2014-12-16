var yast = require('yast-lib');

function updatePassword(req, res, next){
	var newPassword = req.body.newPassword;

	yast.user.updatePassword(req.credentials, newPassword).then(function(){
		res.status(204).end();
	})
	.catch(next);
}

module.exports = {
	post: updatePassword
};