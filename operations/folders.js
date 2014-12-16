var yast         = require('yast-lib');
var errorHandler = require('../lib-error-handler');

function list(req, res){
	yast.folders.list(req.credentials).then(function(folders){
		res.json(folders);
	})
	.catch(errorHandler(req, res));
}

function add(req, res){
	yast.folders.add(req.body, req.credentials).then(function(folder){
		res.json(folder);
	})
	.catch(errorHandler(req, res));
}

function update(req, res){
	yast.folders.update(req.body, req.credentials).then(function(folder){
		res.json(folder);
	})
	.catch(errorHandler(req, res));
}

function remove(req, res){
	yast.folders.remove(req.params.id, req.credentials).then(function(){
		res.status(204).end();
	})
	.catch(errorHandler(req, res));
}

module.exports = {
	add: add,
	update: update,
	remove: remove,
	list: list
};

