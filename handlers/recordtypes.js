var yast = require('yast-lib');

function types(req, res, next){
	yast.records.types(req.credentials).then(function(types){
		res.json(types);
	})
	.catch(next);
}

module.exports.get = types;

