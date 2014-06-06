/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

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
        controller: ($scope, $stateParams) => {
//            console.log($scope.photosCtrl);
            var id=$stateParams.id;
//            $scope.gallery = $scope.photosCtrl.Galleries[id];
        },
        link: (scope:IPhotoGallery, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
        }
    }
}
