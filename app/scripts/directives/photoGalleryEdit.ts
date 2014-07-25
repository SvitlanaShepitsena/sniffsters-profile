/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface IPhotoGalleryEdit extends ng.IScope {
    test:string;
}

var photoGalleryEdit:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/photo-gallery-edit.html',
        // replace directive tag with template info
        replace: true,
        controller: ($scope, $modal) => {
            $scope.files = [];


            $scope.deletePhoto = (id) => {

                var modalInstance = $modal.open({
                    template: "<div><div class=\"modal-body\"> Delete this photo?</div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-click=\"ok()\">OK</button><button class=\"btn btn-warning\" ng-click=\"cancel()\">Cancel</button></div></div>",
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



