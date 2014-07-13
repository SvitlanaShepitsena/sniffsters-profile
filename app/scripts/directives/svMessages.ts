/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../controllers/MessagesCtrl.ts" />
interface ISvMessages extends ng.IScope {
    test:string;
    messages:MessagesCtrl;
    isTrash:boolean;

}

var svMessages:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/sv-messages.html',
        // replace directive tag with template info
        replace: true,
        scope: {
            messages: '=',
            isTrash: '=',

            text: '@',
            func: '&'
        },
        link: (scope:ISvMessages, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
            scope.messages.isTrash = scope.isTrash;
            scope.messages.SetSelectedUser(0);

        }
    }
}
