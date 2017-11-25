'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Conversation Schema
 // Schema defines how chat messages will be stored in MongoDB
 */
var ConversationSchema = new Schema({
	// Conversation model fields
	// ...
	participants: [{ type: Schema.ObjectId, ref: 'User'}],

});

mongoose.model('Conversation', ConversationSchema);
