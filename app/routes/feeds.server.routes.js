'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	feeds = require('../../app/controllers/feeds.server.controller');

module.exports = function(app) {
	// Feed Routes
	app.route('/feeds')
		.get(feeds.list)
		.post(users.requiresLogin, feeds.create);

	app.route('/feeds/:feedId')
		.get(feeds.read)
		.put(users.requiresLogin, feeds.hasAuthorization, feeds.update)
		.delete(users.requiresLogin, feeds.hasAuthorization, feeds.delete);

	// Finish by binding the feed middleware
	app.param('feedId', feeds.feedByID);
};