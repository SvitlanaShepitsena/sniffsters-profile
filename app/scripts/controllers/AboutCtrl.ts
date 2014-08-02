/// <reference path="HomeCtrl.ts" />

interface IAboutScope extends IMainScope {
    about:AboutCtrl;
    ctrl:IndexCtrl;
    home:HomeCtrl;
}
class AboutCtrl {

    constructor(public $scope:IAboutScope, public FinduserService, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.home.IsSearchHidden = false;
        $scope.about = this;
        FinduserService.find('breeder44').then((user)=> {
            console.log('We found: ' + user.UserName);
        }, () => {
            console.log('Does not exist');
        });
    }

    ShowSuccess(note:string) {
        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }
}