var yast = require('yast-lib');

function list(req, res, next){
	yast.settings.list(req.credentials).then(function(settings){
		res.json(settings);
	})
	.catch(next);
}

module.exports = {
	get: list
};