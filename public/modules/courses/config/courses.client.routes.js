'use strict';

//Setting up route
angular.module('courses').config(['$stateProvider',
	function($stateProvider) {
		// Courses state routing
		$stateProvider.
		state('listCourses', {
			url: '/courses',
			templateUrl: 'modules/courses/views/courses.client.view.html'
		}).
		state('addCourse', {
			url: '/courses/add',
			templateUrl: 'modules/courses/views/add-course.client.view.html'
		}).
		state('viewCourse', {
			url: '/courses/:courseId',
			templateUrl: 'modules/courses/views/view-course.client.view.html'
		}).
		state('editCourse', {
			url: '/courses/:courseId/edit',
			templateUrl: 'modules/courses/views/edit-course.client.view.html'
		});
	}
]);
