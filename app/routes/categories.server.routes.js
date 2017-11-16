'use strict';

module.exports = function(app) {
  var categories = require('../../app/controllers/categories.server.controller');
  var users   = require('../../app/controllers/users.server.controller');

	// Routing logic
  app.route('/categories')
    .get(categories.list)
    .post(users.requiresLogin, categories.create);
		// .get(function (request, response) {
		// 	response.json([{ name: 'Beverages' }, { name: 'Condiments' }]);
		// });

  // the categoryId param is added to the params object for the request
  app.route('/categories/:categoryId')
    .get(categories.read)
    .put(users.requiresLogin, categories.update)
    .delete(users.requiresLogin, categories.delete);

    // Finish by binding the article middleware
    	// What's this? Where the categoryId is present in the URL
    	// the logic to 'get by id' is handled by this single function
    	// and added to the request object i.e. request.category.
    app.param('categoryId', categories.categoryByID);
};
