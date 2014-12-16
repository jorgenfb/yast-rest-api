var yast = require('yast-lib');

function update(req, res, next){
	yast.settings.update(req.credentials, req.body.name, req.body.value).then(function(){
		res.json(req.body);
	})
	.catch(next);
}

module.exports = {
	put: update
};