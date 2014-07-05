/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../services/DataService.ts" />
interface IPhotoGallery extends ng.IScope {
    test:string;
    userName:string;
}

var photoGallery:(data) => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/photo-gallery.html',
        // replace directive tag with template info
        replace: true,
        controller: ($scope, $modal, DataService:DataService, $stateParams, $state, toastr) => {
            $scope.tempPhoto = [];
            var index = 0;

            if ($scope.photosCtrl.SelectedGallery == undefined) {
                var id = $stateParams.id;
                DataService.getGalleries($scope.index.BreederName).then((galleries:IGallery[])=> {
                    $scope.photosCtrl.Galleries = galleries;
                    console.log(galleries);
                $scope.photosCtrl.SelectedGallery = $scope.photosCtrl.Galleries[id];
                })
            }


            $scope.shareGallery = () => {
                DataService.shareGallery($scope.photosCtrl.SelectedGallery.Id).then(() => {
                    //Success
                    $scope.photosCtrl.SelectedGallery.IsShared = true;
                    toastr.success('This gallery is shared.');
                }, () => {
                    //error
                })
            }


            $scope.delGallery = () => {

                var modalInstance = $modal.open({
                    template: "<div><div class=\"modal-body\"> Delete this gallery?</div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-click=\"ok()\">OK</button><button class=\"btn btn-warning\" ng-click=\"cancel()\">Cancel</button></div></div>",
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
                        DataService.deleteGallery($scope.photosCtrl.SelectedGallery.Id)
                            .then(() => {
//                        Success
//                        1. Delete Gallery from Array
                                var id = $stateParams.id;
                                $scope.photosCtrl.Galleries.splice(id, 1);
//                        2. Navigate to List of Galleries
                                $state.go('profile.photos2', {});
                            })


                    }
                })

            }
        },
        link: (scope:IPhotoGallery, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
        }
    }
}
