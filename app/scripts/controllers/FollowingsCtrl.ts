/// <reference path="HomeCtrl.ts" />

interface IFollowingsScope extends IHomeScope {
    followingsCtrl:FollowingsCtrl;
    ctrl:IndexCtrl;
    home:HomeCtrl;
    followings:any;
}
class FollowingsCtrl {

    constructor(public $scope, public settings, $firebase, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.followingsCtrl = this;
        $scope.followings = [];
        $scope.noFollowing = settings.noFollowing;

        $scope.home.auth.$getCurrentUser().then((user) => {
            $scope.home.Breedership($scope.home.FireProcess(user.email)).then(() => {

                var followingsUrl = $scope.home.MainUrl;
                followingsUrl += ($scope.home.isBreeder) ? 'breeders/' : 'lookers/';
                followingsUrl += $scope.home.FireProcess(user.email) + '/followings';
                $scope.followingsKeys = _.uniq($firebase(new Firebase(followingsUrl)).$getIndex());

                $scope.followingsKeys.forEach((key)=> {
                    var breederUrl = $scope.home.MainUrl + 'breeders/' + key;
                    var breederRef = $firebase(new Firebase(breederUrl));
                    breederRef.$on('value', (snapshot:any)=> {
                        var breeder = snapshot.snapshot.value;
                        if (!_.isUndefined(breeder.profile.images)) {
                        }
                        $scope.followings.push({
                            userName: breeder.profile.Email,
                            nickName: breeder.profile.UserName,
                            avatar: (breeder.profile.images) ? _.values(breeder.profile.images.avatar)[0] : null

                        });
                    });
                })
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