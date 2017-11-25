'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Message Schema
 */
var MessageSchema = new Schema({
	// Message model fields
	// ...
	conversationId: {
    type: Schema.ObjectId,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: Schema.ObjectId,
    ref: 'User'
  }
},
{ // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
  timestamps: true
});

mongoose.model('Message', MessageSchema);
