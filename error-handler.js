// Error handler
function error(err, req, res, next) {
	console.log(err.stack);

	if(err.apiErrorCode){
		var status = 500;
		if (err.apiErrorCode === 4){
			status = 401;
		}

		res.status(500).json({
			error: err.apiErrorCode,
			message: err.message
		});
	} else {
		res.status(500).send('Internal Server Error');
	}
}

module.exports = error;