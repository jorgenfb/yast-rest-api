var yast = require('yast-lib');

function update(req, res, next){
	yast.folders.update(req.credentials, req.body).then(function(folder){
		res.json(folder);
	})
	.catch(next);
}

function remove(req, res, next){
	yast.folders.remove(req.credentials, req.params.id).then(function(){
		res.status(204).end();
	})
	.catch(next);
}


module.exports = {
	put: update,
	delete: remove
};