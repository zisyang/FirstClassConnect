'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Validation
 */
function validateLength (v) {
  // a custom validation function for checking string length to be used by the model
  return v.length <= 40;
}

/**
 * Product Schema
 */
var ProductSchema = new Schema({
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
		required: 'invalid category'
	},
	name: {
		type: String,
		default: '',
		required: 'Please fill Product name',
		trim: true,
		validate: [validateLength, 'name must be 40 chars in length or less']
	},
	created: {
		type: Date,
		default: Date.now
	},
	quantityPerUnit: {
		type: String
	},
	unitPrice: {
		type: Number,
		default: 0
	},
	unitsInStock: {
		type: Number,
		default: 0,
		min: 0
	},
	unitsOnOrder: {
		type: Number,
		default: 0,
		min: 0
	},
	discontinued: {
		type: Boolean,
		default: false
	}
});

mongoose.model('Product', ProductSchema);
