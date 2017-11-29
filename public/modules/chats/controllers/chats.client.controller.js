'use strict';

angular.module('chats').controller('ChatsController', [
	'$scope',
	'$stateParams',
	'$location',
	'Socket',
	'Authentication',
	'Chats',
	function($scope, $stateParams, $location, Socket, Authentication, Chats) {
		// Controller Logic
		// ...
		$scope.authentication = Authentication;

		$scope.glyphicon = "glyphicon glyphicon-comment";

		$scope.chatroom = 1;

		Socket.on('send-message', function(message) {
		  //  console.log(chat);
				$scope.list();
		});

		$scope.list = function() {
			$scope.chats = Chats.query();
		};

		$scope.sendMessage = function() {
			var chat = new Chats({
				message: this.message
			});
			chat.$save(function(response) {
				$location.path('chats');

				$scope.message = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

	}
]);
