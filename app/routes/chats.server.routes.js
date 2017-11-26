'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	chats = require('../../app/controllers/chats.server.controller');

module.exports = function(app) {
	// Routing logic
	// ...
  // Set chat routes as a subgroup/middleware to apiRoutes
  app.route('/chats')
    // View messages to and from authenticated user
    .get(users.requiresLogin, chats.list)
		.post(users.requiresLogin, chats.create);

	app.route('/chats/:chatId')
		.get(users.requiresLogin, chats.list)
		.put(users.requiresLogin, chats.create)

  // // Retrieve single conversation
  // app.route('/chats')
  //   .get(users.requiresLogin, chat.getConversation)
  //   // Send reply in conversation
  //   .post(users.requiresLogin, chat.sendMessage);


		// Finish by binding the feed middleware
		app.param('chatId', chats.chatByID);
};
