'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Course = mongoose.model('Course');

/**
 * Globals
 */
var user, course;

/**
 * Unit tests
 */
 describe('Course Model', function() {

     describe('Saving', function() {
         it('saves new record', function(done) {
             var course = new Course({
                 name: 'Beverages',
                 description: 'Soft drinks, coffees, teas, beers, and ales'
             });

             course.save(function(err, saved) {
                 should.not.exist(err);
                 done();
             });
         });

         it('throws validation error when name is empty', function(done) {
             var course = new Course({
                 description: 'Computer Engineering'
             });

             course.save(function(err) {
                 should.exist(err);
                 err.errors.name.message.should.equal('name cannot be blank');
                 done();
             });
         });

         it('throws validation error when name longer than 15 chars', function(done) {
             var course = new Course({
                 name: 'Java programming'
             });

             course.save(function(err, saved) {
                 should.exist(err);
                 err.errors.name.message.should.equal('name must be 15 chars in length or less');
                 done();
             });
         });

         it('throws validation error for duplicate course name', function(done) {
             var course = new Course({
                 name: 'Software Engineering'
             });

             course.save(function(err) {
                 should.not.exist(err);

                 var duplicate = new Course({
                     name: 'Software Engineering'
                 });

                 duplicate.save(function(err) {
                     err.err.indexOf('$name').should.not.equal(-1);
                     err.err.indexOf('duplicate key error').should.not.equal(-1);
                     should.exist(err);
                     done();
                 });
             });
         });
     });

     afterEach(function(done) {
         // NB this deletes ALL courses (but is run against a test database)
         Course.remove().exec();
         done();
     });
 });

describe('Course Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() {
			course = new Course({
				// Add model fields
				// ...
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return course.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) {
		Course.remove().exec();
		User.remove().exec();

		done();
	});
});
