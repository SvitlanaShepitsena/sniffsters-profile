/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../models/IBreederProfile.ts" />

interface ISubscriptionPlans extends ng.IScope {
    test:string;
}

var subscriptionPlans = (settings, $popover)  => {
    return{
        restrict: 'E',
        templateUrl: 'views/directives/subscription-plans.html',
        scope: {
            home: '=',
            isAdmin: '='
        },
        replace: true,
        controller: ($scope, toastr) => {

            $scope.home.auth.$getCurrentUser().then((user) => {
                $scope.home.Breedership($scope.home.FireProcess(user.email)).then(() => {
                    $scope.features = $scope.home.MainRefFire.$child('subscriptions').$child('features');
                    $scope.plans = $scope.home.MainRefFire.$child('subscriptions').$child('plans');

                    $scope.feature = {};
                    $scope.popover = {
                        "title": "Add New Subscription Feature"
                    }
                    $scope.popoverDelete = {
                        "title": "Delete?",
                        template: '../../views/modals/delete-confirmation.html'
                    };
                })
            })

            $scope.addNewFeature = () => {
                var newFeature = new Feature();
                newFeature.name = $scope.feature.name;
                newFeature.comment = $scope.feature.comment;

                $scope.features.$add(newFeature);
            }
            $scope.removeFeature = (key) => {

                $scope.features.$remove(key);
            }
            $scope.savePlans = () => {
                $scope.features.$save().then(() => {
                    $scope.plans.$save().then(
                        () => {
                            toastr.success('success');
                        })
                });
            };
        },
        link: (scope, element, attrs:ng.IAttributes) => {
        }
    }
}

