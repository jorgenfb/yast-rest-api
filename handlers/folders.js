var yast = require('yast-lib');

function list(req, res, next){
	yast.folders.list(req.credentials).then(function(folders){
		res.json(folders);
	})
	.catch(next);
}

function add(req, res, next){
	// Make sure its a folder
	req.body.isFolder = true;

	yast.folders.add(req.credentials, req.body).then(function(folder){
		res.json(folder);
	})
	.catch(next);
}

module.exports = {
	get: list,
	post: add
};