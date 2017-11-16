'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose'),
	chalk = require('chalk');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
var uri = config.db;
//var uri = 'mongodb://mongodb-stitch-fcc-eysro:ltXAYleAUAKrXQTu@cluster0-shard-00-00-2pmo6.mongodb.net:27017/mean-dev?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
//mongoose.connect(uri);
var db = mongoose.connect(uri, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
	else
		console.log(chalk.green('MongoDB readyState : ' + mongoose.connection.readyState));
});

// Init the express application
var app = require('./config/express')(db);

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);