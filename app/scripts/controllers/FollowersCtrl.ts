/// <reference path="HomeCtrl.ts" />

interface IFollowersScope extends IMainScope {
    followersCtrl:FollowersCtrl;
    ctrl:IndexCtrl;
    home:HomeCtrl;
    followers:any

}
class FollowersCtrl {

    constructor(public $scope, public settings, $firebase, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.followersCtrl = this;
        $scope.followers = [];

        $scope.home.auth.$getCurrentUser().then((user) => {
            $scope.home.Breedership($scope.home.FireProcess(user.email)).then((userName) => {
                var followersUrl = $scope.home.MainUrl;
                followersUrl += ($scope.home.isBreeder) ? 'breeders/' : 'lookers/';
                followersUrl += $scope.home.FireProcess(userName) + '/followers';

                $scope.followersRef = $firebase(new Firebase(followersUrl));
                $scope.followersKeys = $scope.followersRef.$getIndex();


                $scope.followersKeys.forEach((key)=> {

                    var isBreeder = _.values($scope.followersRef[key])[0];

                    var userType = (isBreeder) ? 'breeders' : 'lookers';
                    var userUrl = $scope.home.MainUrl + userType + '/' + key;

                    var userRef = $firebase(new Firebase(userUrl));
                    userRef.$on('value', (snapshot:any)=> {
                        var breeder = snapshot.snapshot.value;

                        $scope.followers.push({

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