/// <reference path="HomeCtrl.ts" />

interface IFollowersScope extends IMainScope {
    followersCtrl:FollowersCtrl;
    ctrl:IndexCtrl;
    home:HomeCtrl;
    followers:any

}
class FollowersCtrl {

    constructor(public $scope, $firebase, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.followersCtrl = this;
        $scope.followers = [];

        $scope.home.auth.$getCurrentUser().then((user) => {
            $scope.home.Breedership($scope.home.FireProcess(user.email)).then(() => {
                var followersUrl = $scope.home.MainUrl;
                followersUrl += ($scope.home.isBreeder) ? 'breeders/' : 'lookers/';
                followersUrl += $scope.home.FireProcess(user.email) + '/followers';

                $scope.followersKeys = $firebase(new Firebase(followersUrl)).$getIndex();


                $scope.followersKeys.forEach((key)=> {
                    var breederUrl = $scope.home.MainUrl + 'breeders/' + key;
                    var userRef = $firebase(new Firebase(breederUrl));
                    userRef.$on('value', (snapshot:any)=> {
                        var breeder = snapshot.snapshot.value;
                        if (!_.isUndefined(breeder.profile.images)) {
                            console.log(breeder.profile.images.avatar);
                        }
                        $scope.followers.push({

                            userName: breeder.profile.Email,
                            nickName: breeder.profile.UserName,
                            avatar: (breeder.profile.images) ? _.values(breeder.profile.images.avatar) : null

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