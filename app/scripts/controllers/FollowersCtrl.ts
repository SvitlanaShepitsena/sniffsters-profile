/// <reference path="HomeCtrl.ts" />

interface IFollowersScope extends IMainScope {
    followersCtrl:FollowersCtrl;
    ctrl:IndexCtrl;
    home:HomeCtrl;
    followers:any

}
class FollowersCtrl {

    constructor(public $scope:IFollowersScope, $firebase, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.followersCtrl = this;

        $scope.home.auth.$getCurrentUser().then((user) => {
            $scope.home.Breedership($scope.home.FireProcess(user.email)).then(() => {
                var followersUrl = $scope.home.MainUrl;
                followersUrl += ($scope.home.isBreeder) ? 'breeders/' : 'lookers/';
                followersUrl += $scope.home.FireProcess(user.email) + '/followers';
                console.log(followersUrl);
                $scope.followers = $firebase(new Firebase(followersUrl));
            })
        })
    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}