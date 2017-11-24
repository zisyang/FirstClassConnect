'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors.server.controller'),
  Course = mongoose.model('Course'),
    _ = require('lodash');

/**
 * Create a Course
 */
exports.create = function(req, res) {
  var course = new Course(req.body);
  course.user = req.user;

  	course.save(function(err) {
  		if (err) {
  			return res.status(400).send({
  				message: errorHandler.getErrorMessage(err)
  			});
  		} else {
  			res.status(201).json(course);
  		}
  	});
};

/**
 * Show the current Course
 */
exports.read = function(req, res) {
  Course.findById(req.params.courseId).exec(function(err, course) {
		if (err) {
	      return res.status(400).send({
	          message: errorHandler.getErrorMessage(err)
	      });
      } else {
         if (!course) {
				return res.status(404).send({
  					message: 'Course not found'
  				});
			}
			res.json(course);
      }
	});
};

/**
 * Update a Course
 */
exports.update = function(req, res) {
  var course = req.course;

	course = _.extend(course, req.body);

  //#course.user = req.user.id; // for when using listAll

	course.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(course);
		}
  });
};

/**
 * Delete an Course
 */
exports.delete = function(req, res) {
  var course = req.course;

  	course.remove(function(err) {
  		if (err) {
  			return res.status(400).send({
  				message: errorHandler.getErrorMessage(err)
  			});
  		} else {
  			res.json(course);
  		}
  });
};

/**
 * List of Courses by user
 */
exports.list = function(req, res) {
  Course.find({
    user:req.user.id
  }).exec(function(err, courses) {
      if (err) {
          return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
          });
      } else {
          res.json(courses);
      }
    });
};


/**
 * List of All Courses
 */
exports.listAll = function(req, res) {
  Course.find().exec(function(err, courses) {
      if (err) {
          return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
          });
      } else {
          res.json(courses);
      }
    });
};

/**
 * Course middleware
 */
exports.courseByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Course is invalid'
		});
	}

	Course.findById(id).exec(function(err, course) {
		if (err) return next(err);
		if (!course) {
			return res.status(404).send({
  				message: 'Course not found'
  			});
		}
		req.course = course;
		next();
	});
};

/**
 * Product authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.course.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
