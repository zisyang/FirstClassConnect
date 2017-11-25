'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	chat = require('../../app/controllers/chats.server.controller');

module.exports = function(app) {
	// Routing logic
	// ...
  // Set chat routes as a subgroup/middleware to apiRoutes
  app.route('/chats')
    // View messages to and from authenticated user
    .get(users.requiresLogin, chat.getConversations);

  // Retrieve single conversation
  app.route('/chats/:conversationId')
    .get(users.requiresLogin, chat.getConversation)
    // Send reply in conversation
    .post(users.requiresLogin, chat.sendReply);

    // Start new conversation
  app.route('/chats/new/:recipient')
    .post(users.requiresLogin, chat.newConversation);

};
