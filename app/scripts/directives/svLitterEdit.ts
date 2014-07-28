/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../services/DataService.ts" />


var svLitterEdit:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/sv-litter-edit.html',
        // replace directive tag with template info
        replace: true,

        controller: ($scope, $state, $stateParams, $firebase, $modal, $upload, toastr)=> {

            var litterId = $stateParams.id;
            $scope.home.auth.$getCurrentUser().then((user) => {
                $scope.home.Breedership($scope.home.FireProcess(user.email)).then(() => {
                    var litterUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.FireProcess(user.email) + '/litters/' + litterId;
                    $scope.litter = $firebase(new Firebase(litterUrl));
                })
            })

            $scope.saveLitter = () => {
                var photos = $scope.litter.$child('Photos');
                $scope.files.forEach((photo, index)=> {
                    photos.$add(photo);
                    $scope.files.splice(index, 1);
                })
                $scope.litter.$save().then(() => {
                    $state.go('^');
                })
            }

            $scope.deleteLitterPhoto = (id) => {
                var modalInstance = $modal.open({
                    template: "<div><div class=\"modal-body\">Delete this photo?</div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-click=\"ok()\">OK</button><button class=\"btn btn-warning\" ng-click=\"cancel()\">Cancel</button></div></div>",
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
                        $scope.litter.$child('Photos').$remove(id)
                    }
                })
            }

            $scope.today = function () {
                $scope.dt = new Date();
            };
            $scope.today();

            $scope.clear = function () {
                $scope.dt = null;
            };

            $scope.open = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
            };
            $scope.initDate = new Date();
            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[2];
        }

    }
}
