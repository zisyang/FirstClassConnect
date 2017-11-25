'use strict';

// Configuring the Feeds module
angular.module('feeds').run(['Menus',
	function(Menus) {
		// Set top bar menu items											//dropdown
		Menus.addMenuItem('topbar', 'Feeds', 'feeds', '', '/feeds(/create)?');
		// Menus.addSubMenuItem('topbar', 'feeds', 'List Feeds', 'feeds');
		// Menus.addSubMenuItem('topbar', 'feeds', 'New Feed', 'feeds/create');
	}
]);
