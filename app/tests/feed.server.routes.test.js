'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Feed = mongoose.model('Feed'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, feed;

/**
 * Feed routes tests
 */
describe('Feed CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new feed
		user.save(function() {
			feed = {
				title: 'Feed Title',
				content: 'Feed Content'
			};

			done();
		});
	});

	it('should be able to save an feed if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new feed
				agent.post('/feeds')
					.send(feed)
					.expect(200)
					.end(function(feedSaveErr, feedSaveRes) {
						// Handle feed save error
						if (feedSaveErr) done(feedSaveErr);

						// Get a list of feeds
						agent.get('/feeds')
							.end(function(feedsGetErr, feedsGetRes) {
								// Handle feed save error
								if (feedsGetErr) done(feedsGetErr);

								// Get feeds list
								var feeds = feedsGetRes.body;

								// Set assertions
								(feeds[0].user._id).should.equal(userId);
								(feeds[0].title).should.match('Feed Title');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save an feed if not logged in', function(done) {
		agent.post('/feeds')
			.send(feed)
			.expect(401)
			.end(function(feedSaveErr, feedSaveRes) {
				// Call the assertion callback
				done(feedSaveErr);
			});
	});

	it('should not be able to save an feed if no title is provided', function(done) {
		// Invalidate title field
		feed.title = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new feed
				agent.post('/feeds')
					.send(feed)
					.expect(400)
					.end(function(feedSaveErr, feedSaveRes) {
						// Set message assertion
						(feedSaveRes.body.message).should.match('Title cannot be blank');
						
						// Handle feed save error
						done(feedSaveErr);
					});
			});
	});

	it('should be able to update an feed if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new feed
				agent.post('/feeds')
					.send(feed)
					.expect(200)
					.end(function(feedSaveErr, feedSaveRes) {
						// Handle feed save error
						if (feedSaveErr) done(feedSaveErr);

						// Update feed title
						feed.title = 'WHY YOU GOTTA BE SO MEAN?';

						// Update an existing feed
						agent.put('/feeds/' + feedSaveRes.body._id)
							.send(feed)
							.expect(200)
							.end(function(feedUpdateErr, feedUpdateRes) {
								// Handle feed update error
								if (feedUpdateErr) done(feedUpdateErr);

								// Set assertions
								(feedUpdateRes.body._id).should.equal(feedSaveRes.body._id);
								(feedUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of feeds if not signed in', function(done) {
		// Create new feed model instance
		var feedObj = new Feed(feed);

		// Save the feed
		feedObj.save(function() {
			// Request feeds
			request(app).get('/feeds')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single feed if not signed in', function(done) {
		// Create new feed model instance
		var feedObj = new Feed(feed);

		// Save the feed
		feedObj.save(function() {
			request(app).get('/feeds/' + feedObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('title', feed.title);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete an feed if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new feed
				agent.post('/feeds')
					.send(feed)
					.expect(200)
					.end(function(feedSaveErr, feedSaveRes) {
						// Handle feed save error
						if (feedSaveErr) done(feedSaveErr);

						// Delete an existing feed
						agent.delete('/feeds/' + feedSaveRes.body._id)
							.send(feed)
							.expect(200)
							.end(function(feedDeleteErr, feedDeleteRes) {
								// Handle feed error error
								if (feedDeleteErr) done(feedDeleteErr);

								// Set assertions
								(feedDeleteRes.body._id).should.equal(feedSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete an feed if not signed in', function(done) {
		// Set feed user 
		feed.user = user;

		// Create new feed model instance
		var feedObj = new Feed(feed);

		// Save the feed
		feedObj.save(function() {
			// Try deleting feed
			request(app).delete('/feeds/' + feedObj._id)
			.expect(401)
			.end(function(feedDeleteErr, feedDeleteRes) {
				// Set message assertion
				(feedDeleteRes.body.message).should.match('User is not logged in');

				// Handle feed error error
				done(feedDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Feed.remove().exec();
		done();
	});
});