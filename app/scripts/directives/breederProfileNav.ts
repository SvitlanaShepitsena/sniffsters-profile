/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../controllers/HomeCtrl.ts" />

interface IBreederProfileNav extends IHomeScope {
    test:string;
    home:HomeCtrl;
    showMenu:boolean;
}

var breederProfileNav:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/breeder-profile-nav.html',
        // replace directive tag with template info
        replace: true,
        link: (scope:IBreederProfileNav, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
            scope.showMenu = true;
        }
    }
}
