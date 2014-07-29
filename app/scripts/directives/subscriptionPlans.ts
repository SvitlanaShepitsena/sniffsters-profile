/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../models/IBreederProfile.ts" />

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
            $scope.features = $scope.home.MainRefFire.$child('features');


            $scope.feature = {};
            $scope.popover = {
                "title": "Add New Subscription Feature"
            };
            $scope.addNewFeature = () => {
                var newFeature = new Feature();
                newFeature.name = $scope.feature.name;
                newFeature.comment = $scope.feature.comment;

                $scope.features.$add(newFeature);
            }
            $scope.removeFeature = (key) => {

                $scope.features.$remove(key);
            }
        },
        link: (scope:ISubscriptionPlans, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {

        }
    }
}
