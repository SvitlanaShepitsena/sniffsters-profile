/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

var feedbackEdit = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/feedback-edit.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            isOwner: '='
        },
        controller: function ($scope, $stateParams) {
            var index = $stateParams.id;
            $scope.SelectedFeedback = $scope.testimonials.Feedbacks[index];
        }
    };
};
