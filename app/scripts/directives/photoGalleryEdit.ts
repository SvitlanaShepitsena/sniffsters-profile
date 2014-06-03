/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface IPhotoGalleryEdit extends ng.IScope {
    test:string;
}

var photoGalleryEdit:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/photo-gallery-edit.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            galleries: '=',
            userName: '@',
            func: '&'
        },
        controller: ($scope, $stateParams) => {
            var index:number = $stateParams.id;
            $scope.index = index;
//            $scope.gallery = $scope.galleries[index];
        },
        link: (scope:IPhotoGallery, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
        }
    }
}
