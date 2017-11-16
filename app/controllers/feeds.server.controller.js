'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Feed = mongoose.model('Feed'),
	_ = require('lodash');

/**
 * Create a feed
 */
exports.create = function(req, res) {
	var feed = new Feed(req.body);
	feed.user = req.user;

	feed.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(feed);
		}
	});
};

/**
 * Show the current feed
 */
exports.read = function(req, res) {
	res.json(req.feed);
};

/**
 * Update a feed
 */
exports.update = function(req, res) {
	var feed = req.feed;

	feed = _.extend(feed, req.body);

	feed.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(feed);
		}
	});
};

/**
 * Delete an feed
 */
exports.delete = function(req, res) {
	var feed = req.feed;

	feed.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(feed);
		}
	});
};

/**
 * List of Feeds
 */
exports.list = function(req, res) {
	Feed.find().sort('-created').populate('user', 'displayName').exec(function(err, feeds) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(feeds);
		}
	});
};

/**
 * Feed middleware
 */
exports.feedByID = function(req, res, next, id) {
	Feed.findById(id).populate('user', 'displayName').exec(function(err, feed) {
		if (err) return next(err);
		if (!feed) return next(new Error('Failed to load feed ' + id));
		req.feed = feed;
		next();
	});
};

/**
 * Feed authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.feed.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};