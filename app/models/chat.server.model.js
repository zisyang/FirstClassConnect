'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Chat Schema
 */
var ChatSchema = new Schema({
	// Chat model fields
	// ...
	created: {
		type: Date,
		default: Date.now
	},
	message: {
		type: String,
		default: '',
		required: 'Message cannot be blank'
	},
	username: {
		type: String,
		default: ' '
		//for test
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Chat', ChatSchema);
