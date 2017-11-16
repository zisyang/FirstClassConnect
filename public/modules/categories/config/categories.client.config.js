'use strict';

// Categories module config
angular.module('categories').run(['Menus',
	function(Menus) {
		// Config logic
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Categories', 'categories', 'dropdown', '/categories(/create)?');
		Menus.addSubMenuItem('topbar', 'categories', 'List Categories', 'categories');
		Menus.addSubMenuItem('topbar', 'categories', 'New Category', 'categories/create');
	}
]);
