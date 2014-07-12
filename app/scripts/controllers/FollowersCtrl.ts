/// <reference path="HomeCtrl.ts" />

interface IFollowersScope extends IMainScope {
    followers:FollowersCtrl;
    ctrl:IndexCtrl;
    home:HomeCtrl;
}
class FollowersCtrl {

    constructor(public $scope:IFollowersScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.followers = this;

        var fref = new Firebase("https://torid-fire-6526.firebaseio.com/");
        new FirebaseSimpleLogin(fref, () => {
            DataService.getMyFollowers($scope.home.Uname).then((breedersArr:IBreederProfile[])=> {
                $scope.home.Followers = _.values(breedersArr);
            });
        })
    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}