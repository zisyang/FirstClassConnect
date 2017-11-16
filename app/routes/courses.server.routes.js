'use strict';

module.exports = function(app) {
  var courses = require('../../app/controllers/courses.server.controller');
  var users   = require('../../app/controllers/users.server.controller');

	// Routing logic
  app.route('/courses')
    .get(courses.list)
    .post(users.requiresLogin, courses.create);
		// .get(function (request, response) {
		// 	response.json([{ name: 'Beverages' }, { name: 'Condiments' }]);
		// });

  // the courseId param is added to the params object for the request
  app.route('/courses/:courseId')
    .get(courses.read)
    .put(users.requiresLogin, courses.update)
    .delete(users.requiresLogin, courses.delete);

    // Finish by binding the article middleware
    	// What's this? Where the courseId is present in the URL
    	// the logic to 'get by id' is handled by this single function
    	// and added to the request object i.e. request.course.
    app.param('courseId', courses.courseByID);
};
