/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface IFeedbackEdit extends ng.IScope {
	test:string;
}

var feedbackEdit:() => ng.IDirective = () => {

	return{
		restrict: 'E',
		templateUrl: 'views/directives/feedback-edit.html',
		transclude: true,
		// replace directive tag with template info
		replace: true,
		controller: ($scope, $stateParams) => {
			var index:number = $stateParams.id;
			$scope.SelectedFeedback = $scope.testimonials.Feedbacks[index];
		}
	}
}
