'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
  Chat = mongoose.model('Chat'),
  _ = require('lodash');


/**
 * Create a Chat message
 */
exports.create = function(req, res) {
  var chat = new Chat(req.body);
	chat.user = req.user;
  chat.username = req.user.displayName;

	chat.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var socketio = req.app.get('socketio'); // tacke out socket instance from the app container
			socketio.sockets.emit('send-message', chat); // emit an event for all connected clients

			res.json(chat);
		}
	});
};

/**
 * List of Chats
 */
exports.list = function(req, res) {
  Chat.find().sort('-created').populate('user', 'displayName').exec(function(err, chat) {
      if (err) {
          return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
          });
      } else {
					console.log(chat);
          res.json(chat);
      }
    });
};

/**
 * Chat middleware
 */
exports.chatByID = function(req, res, next, id) {
	Chat.findById(id).populate('user', 'displayName').exec(function(err, chat) {
		if (err) return next(err);
		if (!chat) return next(new Error('Failed to load chat ' + id));
		req.chat = chat;
		next();
	});
};

/**
 * Chat authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.chat.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
