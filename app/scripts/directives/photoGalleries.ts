/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface IPhotoGalleries extends ng.IScope {
    test:string;
    userName:string;
}

var photoGalleries:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/photo-galleries.html',
        // replace directive tag with template info
        replace: true,
        scope: {
            galleries: '=',

            text: '@',
            func: '&'
        },
//        controller: ($scope) => {
//            $scope.myvar = '4';
//        }
        link: (scope:IPhotoGalleries, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
            var userName:string= angular.element($('#loggedUser')).html();
            var start:number=userName.indexOf(',')+1;
            var finish:number=userName.indexOf('!');

            scope.userName = userName.substr(start,finish-start).trim();
        }
    }
}
