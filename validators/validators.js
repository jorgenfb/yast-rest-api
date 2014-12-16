/**
 * Responds with an error if request has validation errors. Passes controll to
 * the next processor otherwise.
 *
 * @param  {Request}  res  request
 * @param  {Response} req  response
 * @param  {Function} next callback to pass control to next processor
 */
function checkRequest(req, res, next){
	var errors = req.validationErrors(true);
	if (errors) {
		res.status(400).json({errors: errors});
		return;
	}
	// No errors, let the next process do its job
	next();
}

function checkFields(req, fields){
	fields.forEach(function(field){
		req.checkBody(field, field + ' is required').isLength(1);
	});
}

function requireFields(fields){
	// Return function to handle requests
	return function(req, res, next){
		checkFields(req, fields);
		checkRequest(req, res, next);
	};
}

function requireProject(existing){
	return function(req, res, next){
		if (existing){
			req.checkBody('id', 'id is not an integer').isInt();
		}

		req.checkBody('primaryColor', 'primaryColor is not a valid hex code').isHexColor();
		req.checkBody('parentId', 'parentId is not an integer').isInt();
		req.checkBody('privileges', 'privileges is not an integer').optional().isInt();
		req.checkBody('timeCreated', 'timeCreated is not a valid unix time').optional().isInt();
		req.checkBody('creator', 'creator is not an integer').optional().isInt();

		checkRequest(req, res, next);
	};
}

function requireRecord(existing){
	return function(req, res, next){
		if (existing){
			req.checkBody('id', 'id is not an integer').isInt();
		}

		req.checkBody('typeId', 'typeId is not an integer').isInt();
		req.checkBody('projectId', 'projectId is not an integer').isInt();

		checkRequest(res, req, next);
	};
}

module.exports = {
	requireFields: requireFields,
	requireProject: requireProject
};