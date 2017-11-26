'use strict';

angular.module('chats').controller('ChatsController', [
	'$scope',
	'$stateParams',
	'$location',
	'Authentication',
	'Chats',
	function($scope, $stateParams, $location, Authentication, Chats) {
		// Controller Logic
		// ...
		$scope.authentication = Authentication;

		$scope.glyphicon = "glyphicon glyphicon-comment";

		$scope.chatroom = 1;

		$scope.list = function() {
			// var sample = [
			//       {
			//         'username': 'Matt',
			//         'message': 'Hi!'
			//       },
			//       {
			//         'username': 'Elisa',
			//         'message': 'Whats up?'
			//       },
			//       {
			//         'username': 'Matt',
			//         'message': 'I found this nice AngularJS Directive'
			//       },
			//       {
			//         'username': 'Elisa',
			//         'message': 'Looks Great!'
			//       }
			//     ];
					//$scope.chats = sample;
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
