var config = require('./config');
var atob   = require('atob');

function requireCredentials(req){
	if (req.url.indexOf('api-docs') > 0){
		return false;
	}
	if (req.url.indexOf('swagger-ui') > 0){
		return false;
	}

	var authUrl = config.baseUrl + '/auth';
	if (req.url === authUrl && req.method === 'POST') {
		return false;
	}

	return true	;
}

function hasCredentials(req){
	return req.query.api_key;
}


function authenticator(req, res, next){
	if (!requireCredentials(req)){
		next();
	} else if (hasCredentials(req)){
		var token = req.query.api_key;
		req.credentials = JSON.parse(atob(token));
		next();
	} else {
		res.status(401);
		res.send('Unauthorized');
	}
}

module.exports = authenticator;