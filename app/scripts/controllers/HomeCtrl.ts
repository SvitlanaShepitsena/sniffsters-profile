/// <reference path="IndexCtrl.ts" />

interface IHomeScope extends IMainScope {
    home:HomeCtrl;
    ctrl:IndexCtrl;
    auth:FirebaseSimpleLogin
}
class HomeCtrl {

    constructor(public $scope:IHomeScope, $firebase, $firebaseSimpleLogin, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.home = this;
        var fref = new Firebase("https://torid-fire-6526.firebaseio.com/");
        $scope.auth = $firebaseSimpleLogin(fref);

        console.log($scope.auth);
        this.IsSearchHidden = true;

    }

    IsSearchHidden:boolean;

    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}