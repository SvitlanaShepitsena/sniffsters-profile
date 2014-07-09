/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angular-ui/angular-ui-router.d.ts" />
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

        controller: ($scope:INewMessage, $state:ng.ui.IStateService, DataService:DataService, toastr:Toastr) => {

            $scope.Send = (to:string, body:string)=> {
                DataService.sendNewMessage($scope.home.IdFire, to, body).then(() => {
                    $scope.note.to = "";
                    $scope.note.body = "";
                    toastr.success('Your message has been sent');

                    $state.go('^');
                })
            }
        }
    }
}
