/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../services/DataService.ts" />

interface INewMessage extends ng.IScope {
    test:string;
    note:{}
    Send:(to:string, body:string) => void;
}

var newMessage:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/new-message.html',
        replace: true,
        scope: {
            ctrl: '=',

            text: '@',
            func: '&'
        },
        controller: (scope:INewMessage, $state, DataService:DataService) => {
            scope.note = {};
            scope.Send = (to:string, body:string)=> {

            }
        }
    }
}
