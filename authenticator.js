var config = require('./config');
var atob   = require('atob');

function requireCredentials(req){
	// No need for credentials for reading API documentation
	if (req.url === '/api-docs' && req.method === 'GET'){
		return false;
	}

	// Do not require credentials for the authorization request.
	if (req.url === '/auth' && req.method === 'POST') {
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