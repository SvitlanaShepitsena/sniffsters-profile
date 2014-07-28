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
            showMessages: '=',
            mainFire: '=',
            admin: '=',
            isBreeder: '='
        },

        controller($scope, toastr) {

            $scope.message = {};

            $scope.sendAdminMessage = (index) => {
                var messageTo = new Note();
                messageTo.body = $scope.message.body;
                messageTo.userName = $scope.admin;
                messageTo.isTrash = false;
                messageTo.sent = Date.now();
                messageTo.amISender = false;

                var userType = $scope.isBreeder ? 'breeders' : 'lookers';

                var receiverMessages = $scope.mainFire.$child(userType).$child($scope.addressat.replace(/\./g, '(p)')).$child('messages');
                receiverMessages.$add(messageTo);

                var messageFrom = new Note();
                messageFrom.body = $scope.message.body;
                messageFrom.userName = $scope.addressat;
                messageFrom.isTrash = false;
                messageFrom.sent = Date.now();
                messageFrom.amISender = true;

                var senderMessages = $scope.mainFire.$child('admins').$child('messages');
                senderMessages.$add(messageFrom).then(() => {
                    toastr.success('Message has been send');
                    $scope.showMessages.splice(index, 1);

                });


            }
            $scope.cancelAdminMessage = (index) => {
                $scope.showMessages.splice(index, 1);
            }
        },
        link: (scope, element, attrs) => {


        }
    }
}
