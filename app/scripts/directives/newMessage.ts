/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../services/DataService.ts" />
/// <reference path="../controllers/HomeCtrl.ts" />

interface INewMessage extends IHomeScope {
    test:string;
    note:{
        to:string;
        body:string;
    };
    home:HomeCtrl;
    Send:(to:string, body:string) => void;
}

var newMessage:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/new-message.html',
        replace: true,

        controller: ($scope:INewMessage, $state, DataService:DataService) => {

            $scope.Send = (to:string, body:string)=> {
                DataService.sendNewMessage($scope.home.IdFire, to, body).then(() => {
                    $scope.note.to = "";
                    $scope.note.body = "";
                    console.log('Message has been sent');
                })
            }
        }
    }
}
