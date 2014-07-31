/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase.d.ts" />
/// <reference path="../services/DataService.ts" />


var svLitter:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/sv-litter.html',
        replace: true,

        controller($scope, $firebase, $modal, DataService:DataService, $stateParams, $state) {
            $scope.files = [];
            var litterId = $stateParams.id;
            $scope.home.auth.$getCurrentUser().then((user) => {
                $scope.home.Breedership($scope.home.FireProcess(user.email)).then(() => {
                    var litterUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.FireProcess(user.email) + '/litters/' + litterId;
                    $scope.litter = $firebase(new Firebase(litterUrl));
                })
            })

            $scope.remove = (key) => {
                $scope.litter.$remove(key).then(() => {
                    $state.go('^');
                });
            }
        },
        link: (scope, element, attrs) => {
        }
    }
}
