/// <reference path="HomeCtrl.ts" />

interface IBreedersScope extends IMainScope {
    breedersCtrl:BreedersCtrl;
    ctrl:IndexCtrl;
    home:HomeCtrl;
}
class BreedersCtrl {
    breeders:IBreederProfile[];

    constructor(public $scope:IBreedersScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.home.IsSearchHidden = false;
        $scope.breedersCtrl = this;

        var fref = new Firebase("https://torid-fire-6526.firebaseio.com/");
        new FirebaseSimpleLogin(fref, () => {
            DataService.getAllProfiles().then((breedersArr:IBreederProfile[])=> {
                this.breeders = _.values(breedersArr);
            });
        })
    }

    followUser(loggedUser:string, follower:string) {
        this.DataService.followUser(loggedUser, follower).then(()=> {

            this.$scope.home.AddToFollowers(follower);
        })
    }

    unFollowUser(loggedUser:string, follower:string) {
        this.DataService.unFollowUser(loggedUser, follower).then(()=> {
            this.$scope.home.RemoveFromFollowers(follower);
        })
    }

    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}