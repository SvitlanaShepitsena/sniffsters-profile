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

            $scope.deleteLitter = () => {
                var modalInstance = $modal.open({
                    template: "<div><div class=\"modal-body\">Delete this Litter?</div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-click=\"ok()\">OK</button><button class=\"btn btn-warning\" ng-click=\"cancel()\">Cancel</button></div></div>",
                    size: 'sm',
                    controller: ($scope, $modalInstance) => {
                        $scope.ok = () => {
                            $modalInstance.close(true)
                        }
                        $scope.cancel = () => {
                            $modalInstance.close(false)
                        }
                    }
                });

                modalInstance.result.then((confirmation:boolean) => {
                    if (confirmation) {
                        $scope.litter.$remove().then(() => {
                            $state.go('^');
                        })
                    }
                })
            }
        },
        link: (scope, element, attrs) => {

        }
    }
}
