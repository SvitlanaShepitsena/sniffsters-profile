/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />


var photoGalleryEdit:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/photo-gallery-edit.html',
        // replace directive tag with template info
        replace: true,
        controller: ($scope, $state, $modal) => {
            $scope.files = [];

            $scope.saveGallery = () => {
                var photos = $scope.gallery.$child('Photos');

                $scope.files.forEach((photo, index)=> {
                    photos.$add(photo);
                })

                $scope.gallery.$save().then(() => {
                    $state.go('^');
                })
            }
            $scope.saveTitle = () => {
                $scope.gallery.$save('Title').then(() => {
//                    $state.go('^');
                })
            }

            $scope.deletePhoto = (id) => {
                var modalInstance = $modal.open({
                    template: "<div><div class=\"modal-body\"> Delete this photo?</div>" +
                        "<div class=\"modal-footer\">" +
                        "<button class=\"btn btn-primary\" ng-click=\"ok()\">OK</button>" +
                        "<button class=\"btn btn-warning\" ng-click=\"cancel()\">Cancel</button>" +
                        "</div></div>",
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
                        $scope.gallery.$child('Photos').$remove(id);
                    }
                })
            }
        }
    }
}
