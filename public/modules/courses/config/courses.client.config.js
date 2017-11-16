'use strict';

// Courses module config
angular.module('courses').run(['Menus',
	function(Menus) {
		// Config logic
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'My Courses', 'courses', 'dropdown', '/courses(/create)?');
		Menus.addSubMenuItem('topbar', 'courses', 'List Courses', 'courses');
		Menus.addSubMenuItem('topbar', 'courses', 'Add Course', 'courses/create');
	}
]);
