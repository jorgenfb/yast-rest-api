var yast = require('yast-lib');

function update(req, res, next){
	yast.projects.update(req.credentials, req.body).then(function(project){
		res.json(project);
	})
	.catch(next);
}

function remove(req, res, next){
	yast.projects.remove(req.credentials, req.params.id).then(function(){
		res.status(204).end();
	})
	.catch(next);
}


module.exports = {
	put: update,
	delete: remove
};