/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />


var svAddPrevPuppies = ($modal) => {

    return{
        restrict: 'E',
        template: '<button class="btn btn-default btn-sniff-md z-index-high" ng-if="home.isOwner" ng-click="showAddPrevPuppies()">Add Photos</button>',
        replace: true,

        controller($scope) {
            var myOtherModal = $modal({scope: $scope, template: '../../views/modals/add-prev-puppies.html', show: false});
            $scope.showAddPrevPuppies = () => {
                myOtherModal.$promise.then(myOtherModal.show);
            }
        },
        link: (scope, element, attrs) => {
        }
    }
}
