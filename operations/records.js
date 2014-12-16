var yast         = require('yast-lib');
var errorHandler = require('../lib-error-handler');

function search(req, res){
	var params = {
		typeId: req.query.type,
		parentId: req.query.projects,
		timeFrom: req.query.from,
		timeTo: req.query.to
	};

	yast.records.search(params, req.credentials).then(function(records){
		res.json(records);
	})
	.catch(errorHandler(req, res));
}

function types(req, res){
	yast.records.types(req.credentials).then(function(types){
		res.json(types);
	})
	.catch(errorHandler(req, res));
}

function add(req, res){
	yast.records.add(req.body, req.credentials).then(function(response){
		res.json(response);
	})
	.catch(errorHandler(req, res));
}

function update(req, res, next){
	// Check that id matches
	if (req.body.id === req.params.id){
		yast.records.add(req.body, req.credentials).then(function(response){
			res.json(response);
		})
		.catch(errorHandler(req, res));
	} else {
		var err = new Error('Record id does not match url parameter');
		err.status = 400;
		next(err);
	}
}

function remove(req, res){
	yast.records.remove(req.params.id, req.credentials).then(function(){
		res.status(200).end();
	})
	.catch(errorHandler(req, res));
}

module.exports = {
	search: search,
	types: types,
	add: add,
	update: update,
	remove: remove
};

