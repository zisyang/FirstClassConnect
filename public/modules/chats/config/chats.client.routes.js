'use strict';

//Setting up route
angular.module('chats').config(['$stateProvider',
	function($stateProvider) {
		// Chats state routing
		$stateProvider.
		state('newChats', {
			url: '/chats/new',
			templateUrl: 'modules/chats/views/new-chats.client.view.html'
		}).
		state('chats', {
			url: '/chats',
			templateUrl: 'modules/chats/views/chats.client.view.html'
		});
	}
]);
