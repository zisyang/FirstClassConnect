'use strict';

// Chats module config
angular.module('chats').run(['Menus',
	function(Menus) {
		// Config logic
		// ...																				//dropdown
		Menus.addMenuItem('topbar', 'Chats', 'chats', '', '/chats(/new)?');
		//Menus.addSubMenuItem('topbar', 'chats', 'Chat', 'chats');
		//Menus.addSubMenuItem('topbar', 'chats', 'New Chat', 'chats/new');
	}
]);
