var yast = require('yast-lib');

function info(req, res, next){
	yast.user.info(req.credentials).then(function(info){
		res.json(info);
	})
	.catch(next);
}

module.exports = {
	get: info,
};