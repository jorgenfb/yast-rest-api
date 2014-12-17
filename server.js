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
app.use(authenticator);
app.use(swaggerize({
    api: api,
    handlers: './handlers'
}));
app.use(errorHandler);

app.listen(config.port);
console.log('Magic happens on port ' + config.port);