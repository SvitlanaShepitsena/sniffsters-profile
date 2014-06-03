/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface IPhotoGallery extends ng.IScope {
    test:string;
    userName:string;
}

var photoGallery:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/photo-gallery.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            galleries: '=',

            text: '@',
            func: '&'
        },
        controller: ($scope, $stateParams) => {
            var index:number = $stateParams.id;
            $scope.index = index;
//            $scope.gallery = $scope.galleries[index];
        },
        link: (scope:IPhotoGallery, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
            var userName:string = angular.element($('#loggedUser')).html();
            var start:number = userName.indexOf(',') + 1;
            var finish:number = userName.indexOf('!');
            scope.userName = userName.substr(start, finish - start).trim();
        }
    }
}
