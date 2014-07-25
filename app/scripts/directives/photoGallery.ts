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
        controller: ($scope, $firebase, $modal, DataService:DataService, $stateParams, $state, toastr) => {
            var galleryId = $stateParams.id;


            $scope.home.auth.$getCurrentUser().then((user) => {

                $scope.home.Breedership($scope.home.FireProcess(user.email)).then(() => {
                    var galleryUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.FireProcess(user.email) + '/galleries/' + galleryId;
                    $scope.gallery = $firebase(new Firebase(galleryUrl));

                })
            })

//            $scope.gallery = $scope.galleries[galleryId];



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


                    }
                })

            }
        },
        link: (scope:IPhotoGallery, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
        }
    }
}
