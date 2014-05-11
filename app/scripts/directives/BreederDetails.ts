/// <reference path="../../bower_components/dt-angular/angular.d.ts" />
interface IDBreeederDetails extends ng.IScope {
    test:string;
}


var breederDetails:() => ng.IDirective = () => {

    return{
        restrict: 'EAC',
        templateUrl: 'views/directives/breeder-personal.html',
        transclude:true,
        replace:true,
        scope:{
            text:'@',
            ctrl:'=',
            func:'&'
        },
        link:(scope:IDBreeederDetails, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
//            SCOPE (USE just {{test}} . )
            scope.test = 'Test from link scope';


// Element
            element.on('mouseover', (e) => {
                element.css({opacity: 0.75});
            });
            element.on('mouseout', (e) => {
                element.css({opacity: 1});
            });

        }
    }

}
