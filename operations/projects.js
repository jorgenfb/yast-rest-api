var yast         = require('yast-lib');
var errorHandler = require('../lib-error-handler');

function list(req, res, next){
	yast.projects.list(req.credentials).then(function(projects){
		res.json(projects);
	})
	.catch(errorHandler(req, res));
}

function add(req, res, next){
	yast.projects.add(req.body, req.credentials).then(function(project){
		res.json(project);
	})
	.catch(errorHandler(req, res));
}

function update(req, res, next){
	yast.projects.update(req.body, req.credentials).then(function(project){
		res.json(project);
	})
	.catch(errorHandler(req, res));
}

function remove(req, res, next){
	yast.projects.remove(req.params.id, req.credentials).then(function(){
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

