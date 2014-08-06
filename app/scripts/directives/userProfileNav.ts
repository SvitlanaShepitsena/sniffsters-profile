/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../controllers/HomeCtrl.ts" />


var userProfileNav:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/user-profile-nav.html',
        // replace directive tag with template info
        replace: true,

    }
}
