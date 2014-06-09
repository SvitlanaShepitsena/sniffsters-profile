/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../services/DataService.ts" />
interface IPhotoGallery extends ng.IScope {
    test:string;
    userName:string;
}

var photoGallery:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/photo-gallery.html',
        // replace directive tag with template info
        replace: true,
        controller: ($scope, DataService:DataService, $stateParams, $state) => {
            $scope.delGallery = () => {
                DataService.deleteGallery($scope.photosCtrl.SelectedGallery.Id)
                .then(() => {
//                        Success
//                        1. Delete Gallery from Array
                        var id = $stateParams.id;
                        $scope.photosCtrl.Galleries.splice(id, 1);
//                        2. Navigate to List of Galleries
                        $state.go('profile.photos',{});
                    })
            }
        },
        link: (scope:IPhotoGallery, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
        }
    }
}
