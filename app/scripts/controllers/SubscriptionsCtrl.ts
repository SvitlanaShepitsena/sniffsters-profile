/// <reference path="HomeCtrl.ts" />

interface ISubscriptionsScope extends IHomeScope {
    subscriptions:SubscriptionsCtrl;
    home:HomeCtrl;
}
class SubscriptionsCtrl {

    constructor(public $scope:ISubscriptionsScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.subscriptions = this;
    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}