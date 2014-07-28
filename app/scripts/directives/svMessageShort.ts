/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/underscore/underscore.d.ts" />
/// <reference path="../models/IBreederProfile.ts" />


var svMessageShort:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/sv-message-short.html',
        replace: true,
        scope: {
            index: '=',
            addressat: '=',
            showMessages: '='
        },

        controller($scope) {

            $scope.message = {};

            $scope.sendAdminMessage = () => {
                var messageFrom = new Note();
                messageFrom.body = $scope.message.body;
                messageFrom.userName = $scope.addressat;
                messageFrom.isTrash = false;
                messageFrom.sent = Date.now();
                messageFrom.amISender = true;

//                var senderMessagesUrl =

            }
            $scope.cancelAdminMessage = (index) => {
                $scope.showMessages.splice(index, 1);
            }
        },
        link: (scope, element, attrs) => {


        }
    }
}
