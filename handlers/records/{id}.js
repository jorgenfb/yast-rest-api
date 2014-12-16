var yast = require('yast-lib');

function update(req, res, next){
	// Check that id matches
	if (Number(req.body.id) === Number(req.params.id)){
		yast.records.update(req.credentials, req.body).then(function(record){
			res.json(record);
		})
		.catch(next);
	} else {
		var err = new Error('Record id does not match url parameter');
		err.status = 400;
		next(err);
	}
}

function remove(req, res, next){
	yast.records.remove(req.credentials, req.params.id).then(function(){
		res.status(204).end();
	})
	.catch(next);
}

module.exports = {
	put: update,
	delete: remove
};

