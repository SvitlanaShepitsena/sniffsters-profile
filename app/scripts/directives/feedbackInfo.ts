/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface IFeedbackInfo extends ng.IScope {
    test:string;
}

var feedbackInfo:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/feedback-info.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            f: '=',
            isOwner: '=',
            text: '@',
            func: '&'
        },
        link: (scope:IFeedbackInfo, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {

        }
    }
}
