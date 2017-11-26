'use strict';

//Chats service used to communicate Chats REST endpoints
angular.module('chats').factory('Chats', ['$resource',
	function($resource) {
		// Chats service logic
		// ...
		// Public API
		return $resource('chats/:chatId', { courseId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
