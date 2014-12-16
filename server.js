var fs         = require('fs');
var yaml       = require('js-yaml');
var config     = require('./config');
var express    = require('express');
var bodyParser = require('body-parser');
var swaggerize = require('swaggerize-express');
var authenticator = require('./authenticator');
var errorHandler = require('./error-handler');
var cors = require('cors');

// Load API definition
var api = yaml.safeLoad(fs.readFileSync('./api.yaml', 'utf8'));

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors()); // include before other routes
// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');

//     next();
// });
app.use(authenticator);
app.use(swaggerize({
    api: api,
    handlers: './handlers'
}));
app.use(errorHandler);


// Serve swagger ui
app.use('/swagger-ui', express.static(__dirname + '/swagger-ui'));

app.listen(config.port);
console.log('Magic happens on port ' + config.port);



// var express       = require('express');
// var bodyParser    = require('body-parser');
// var errorHandler  = require('./error-handler');
// var authenticator = require('./authenticator');
// var validator     = require('express-validator');
// var router        = require('./router');

// var app           = express();

// // configure app to use bodyParser()
// // this will let us get the data from a POST
// app.use(bodyParser.urlencoded({ extended: true }));

// // Add validator functions to requests
// app.use(validator());

// // Parse body as json
// app.use(bodyParser.json());

// // Make sure caller is authenticated
// app.use(authenticator);

// // Error handler
// app.use(errorHandler);

// // REGISTER OUR ROUTES -------------------------------
// // all of our routes will be prefixed with config.baseUrl
// app.use(config.baseUrl, router);

// // START THE SERVER
// // =============================================================================
// app.listen(config.port);
// console.log('Magic happens on port ' + config.port);

