/// <reference path="IndexCtrl.ts" />


interface IMessagesScope extends IMainScope {
    messages:MessagesCtrl;
    ctrl:IndexCtrl;

}
class MessagesCtrl {

    constructor(public $scope, $modal, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {


        var messages = DataService.getMessages($scope.home.IdFire);
        var i = 12;
    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}