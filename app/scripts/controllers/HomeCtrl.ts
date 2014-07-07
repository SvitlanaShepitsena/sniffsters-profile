/// <reference path="IndexCtrl.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase-simplelogin.d.ts" />

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

        this.IsSearchHidden = true;

    }

    Logout() {
//        console.log('Test');

        var fref = new Firebase("https://torid-fire-6526.firebaseio.com/");
        var auth = new FirebaseSimpleLogin(fref, (error, user) => {
            if (error) {
                // an error occurred while attempting login
                alert(error);
            } else if (user) {
                // user authenticated with Firebase
//                alert('User ID: ' + user.id + ', Provider: ' + user.provider);
            } else {
                // user is logged out
                this.ShowSuccess('You were successfully logged out');
            }
        });
        auth.logout();
    }

    IsSearchHidden:boolean;

    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}