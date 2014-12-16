var yast = require('yast-lib');

function search(req, res, next){
	var params = {};

	if (req.query.type){
		params.typeId = req.query.type;
	}
	if (req.query.projects){
		params.parentId = req.query.projects;
	}
	if (req.query.from){
		params.timeFrom = req.query.from;
	}
	if (req.query.to){
		params.timeTo = req.query.to;
	}

	yast.records.search(req.credentials, params).then(function(records){
		res.json(records);
	})
	.catch(next);
}

function add(req, res, next){
	yast.records.add(req.credentials, req.body).then(function(response){
		res.json(response);
	})
	.catch(next);
}

module.exports = {
	get: search,
	post: add
};

