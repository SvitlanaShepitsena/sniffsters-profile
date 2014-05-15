/// <reference path="../app.ts" />
/// <reference path="../services/DataService.ts" />
interface IDBreeederDetails extends ng.IScope {
    test:string;
}
//
var breederDetails:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/breeder-details.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',
            text: '@',
            func: '&'
        },
//        Directive can have controllers and have the same capabilities to do any data management

//        controller: ($scope, DataService:DataService) => {
//            var bc = DataService.getProfile<IBreederProfile>();
//        },
        link: (scope:IDBreeederDetails, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
//            SCOPE (USE just {{test}} . )
            scope.test = 'Test from link scope';
        }
    }
}
