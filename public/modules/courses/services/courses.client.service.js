'use strict';

//Courses service used to communicate Courses REST endpoints
angular.module('courses').factory('Courses', ['$resource',
	function($resource) {
		// Courses service logic
		return $resource('courses/:courseId', { courseId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
