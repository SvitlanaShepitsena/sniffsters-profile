/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface ISubscriptionPlans extends ng.IScope {
    test:string;
}

var subscriptionPlans:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/subscription-plans.html',
        // replace directive tag with template info
        replace: true,
        controller: ($scope) => {
            $scope.popover = {
                "title": "Title",
                "content": "Hello Popover<br />This is a multiline message!"
            };
        },
        link: (scope:ISubscriptionPlans, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {

        }
    }
}
