/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../controllers/MessagesCtrl.ts" />
interface ISvMessages extends ng.IScope {
    test:string;
    messages:MessagesCtrl;
    isTrash:boolean;

}

var svMessages = (settings) => {

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
        link: (scope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
            scope.noMessages = settings.noMessages;
            scope.messages.isTrash = scope.isTrash;
            scope.messages.SetSelectedUser(0);

        }
    }
}
