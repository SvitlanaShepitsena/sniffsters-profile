/// <reference path="HomeCtrl.ts" />

interface IAdminPanelScope extends IHomeScope {
    adminPanel:AdminPanelCtrl;
    home:HomeCtrl;
}
class AdminPanelCtrl {

    constructor(public $scope:IAdminPanelScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.home.IsSearchHidden = false;
        $scope.adminPanel = this;
    }

    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }
}