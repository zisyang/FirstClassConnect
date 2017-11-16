'use strict';

angular.module('feeds').controller('FeedsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Feeds',
	function($scope, $stateParams, $location, Authentication, Feeds) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var feed = new Feeds({
				title: this.title,
				content: this.content
			});
			feed.$save(function(response) {
				$location.path('feeds/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(feed) {
			if (feed) {
				feed.$remove();

				for (var i in $scope.feeds) {
					if ($scope.feeds[i] === feed) {
						$scope.feeds.splice(i, 1);
					}
				}
			} else {
				$scope.feed.$remove(function() {
					$location.path('feeds');
				});
			}
		};

		$scope.update = function() {
			var feed = $scope.feed;

			feed.$update(function() {
				$location.path('feeds/' + feed._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.feeds = Feeds.query();
		};

		$scope.findOne = function() {
			$scope.feed = Feeds.get({
				feedId: $stateParams.feedId
			});
		};
	}
]);