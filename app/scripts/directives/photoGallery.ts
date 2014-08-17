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
            $scope.home.isLoadFinished = false;

            var galleryId = $stateParams.id;
            var username = $scope.home.FireProcess($stateParams.uname);
            var galleryUrl = $scope.home.MainUrl + 'breeders/' + username + '/galleries/' + galleryId;
            $scope.gallery = $firebase(new Firebase(galleryUrl));


            $scope.home.auth.$getCurrentUser().then((user) => {

                if (user == null) {
                    $scope.home.isLoadFinished = true;
                    return;
                }
                $scope.home.Breedership($scope.home.FireProcess(user.email)).then(() => {
                    $scope.home.isLoadFinished = true;
                })
            })

            $scope.remove = (key) => {
                $scope.gallery.$remove(key).then(() => {
                    $state.go('^');
                });
            }
        },
        link: (scope:IPhotoGallery, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
        }
    }
}
