var yast = require('yast-lib');

function list(req, res, next){
	yast.projects.list(req.credentials).then(function(projects){
		res.json(projects);
	})
	.catch(next);
}

function add(req, res, next){
	yast.projects.add(req.credentials, req.body).then(function(project){
		res.json(project);
	})
	.catch(next);
}

module.exports = {
	get: list,
	post: add
};