
var feedbackEdit = function () {
	return {
		restrict: 'E',
		templateUrl: 'views/directives/feedback-edit.html',
		transclude: true,
		replace: true,
		controller: function ($scope, $stateParams) {
			var index = $stateParams.id;
			$scope.SelectedFeedback = $scope.testimonials.Feedbacks[index];
		}
	};
};
