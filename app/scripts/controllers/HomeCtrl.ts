/// <reference path="IndexCtrl.ts" />
/// <reference path="../utils/IUserGenerator.ts" />
/// <reference path="../utils/BreederGenerator.ts" />
/// <reference path="../utils/LookerGenerator.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase-simplelogin.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angularfire/angularfire.d.ts" />


interface IHomeScope extends IMainScope {
    home:HomeCtrl;
    ctrl:IndexCtrl;
}
class HomeCtrl {
    nickName:any
    nickNameFire:any
    userName:any;
    userNameFire:string;

    subscription:any;

    MainUrl:string;
    MainRef:Firebase;
    MainRefFire:any;

    auth:any;

    Id:string;
    IsHome:boolean;

    url2:string;
    url:string;
    Followings:string[];
    menuIndex:number;

    isBreeder:boolean;
    isAdmin:boolean;
    isOwner:boolean;

    isLoggedIn:boolean = false;

    FacebookSignin() {
        console.log('fblog');
        this.auth.$login('facebook',
            {rememberMe: false}
        ).then((user)=> {
//                this.isLoggedIn = true;
                if (user) {
                    this.$scope.facebookUid = user.id;

                    this.FinduserService.findByEmail(user.id).then((userProfile)=> {
                            ///was found
                            this.nickName = userProfile.UserName;
                            this.nickNameFire = this.FireProcess(this.nickName);
                            this.userName = userProfile.Email;
                            this.userNameFire = this.FireProcess(this.userName);
                            this.isLoggedIn = true;
                            this.isBreeder = userProfile.isBreeder;

                            if (this.isBreeder == true) {
                                this.$state.go('user.profile.about1', {uname: userProfile.Email});
                            }

                            if (this.isBreeder == false) {
                                this.$state.go('looker.account', {uname: userProfile.Email});
                            }
                        },
                        () => {
                            //was not found
                            this.$scope.modal = this.$modal(
                                {
                                    scope: this.$scope,
                                    title: 'Choose username',
                                    template: '../views/modals/choose-username-facebook.html',
                                    show: true
                                }
                            );
                        }
                    )

                } else {
                    // user logout
                    this.isLoggedIn = false;
                    this.auth.user = null;
                }
            }, (error)=> {
                this.ShowError(error);
            })
    }


    constructor(public $rootScope, public $scope, public $modal, public FinduserService, public settings, public $filter, public $stateParams, public $q:ng.IQService, public $firebase, public $firebaseSimpleLogin, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                this.url2 = toState.name;
            })

        $scope.home = this;
        this.menuIndex = 1;


        $scope.usernameFb = {};
        $scope.isBreederFb = {};

        $scope.setUsernameFb = (userNameFb, isBreederFb) => {

            FinduserService.find(userNameFb).then(() => {
                //exists

                $scope.userExists = true;
                this.ShowError(settings.userExists);
            }, () => {
                //free
                if (isBreederFb) {
                    var breederGenerator = new BreederGenerator();
                    breederGenerator.create($scope.home.FireProcess($scope.facebookUid), this.MainUrl, this.$firebase, userNameFb);
                } else {
                    var lookerGenerator = new LookerGenerator();
                    lookerGenerator.create($scope.home.FireProcess($scope.facebookUid), this.MainUrl, this.$firebase, userNameFb);
                }
                this.Breedership(this.FireProcess(userNameFb));

                this.nickName = userNameFb;
                this.nickNameFire = this.FireProcess(userNameFb);
                this.userName = this.$scope.facebookUid;
                this.userNameFire = this.FireProcess(this.$scope.facebookUid);


                this.isLoggedIn = true;
                this.isBreeder = isBreederFb;
                this.$scope.modal.hide();

                ///////////////////////
                if (isBreederFb) {
                    this.$state.go('user.profile.about1', {uname: this.userName});
                }

                if (!isBreederFb) {
                    this.$state.go('looker.account', {uname: this.userName});

                }
                this.$scope.modal.hide();
                ///////////////////////

            })
        }

        $scope.fetchDog = (breed, location)=> {

            $state.go('sniff.breeders', {
                breed: breed,
                location: location
            });
        }

        this.MainUrl = settings.mainUrl;
        this.MainRef = new Firebase(this.MainUrl);
        this.MainRefFire = $firebase(new Firebase(this.MainUrl));

        var breedsRef = $firebase(new Firebase(this.MainUrl + 'breeds'));
        breedsRef.$on('value', (snapshot:any)=> {
            var breeds = snapshot.snapshot.value;
            $scope.breeds = $filter('orderByPriority')(breeds);
        });
//        var locationsRef = $firebase(new Firebase(this.MainUrl + 'locations'));
//        locationsRef.$on('value', (snapshot:any)=> {
//            var locations = snapshot.snapshot.value;
//            $scope.locations = $filter('orderByPriority')(locations);
//        });

        $scope.states = [
            { name: 'ALABAMA', abbreviation: 'AL'},
            { name: 'ALASKA', abbreviation: 'AK'},
            { name: 'AMERICAN SAMOA', abbreviation: 'AS'},
            { name: 'ARIZONA', abbreviation: 'AZ'},
            { name: 'ARKANSAS', abbreviation: 'AR'},
            { name: 'CALIFORNIA', abbreviation: 'CA'},
            { name: 'COLORADO', abbreviation: 'CO'},
            { name: 'CONNECTICUT', abbreviation: 'CT'},
            { name: 'DELAWARE', abbreviation: 'DE'},
            { name: 'DISTRICT OF COLUMBIA', abbreviation: 'DC'},
            { name: 'FEDERATED STATES OF MICRONESIA', abbreviation: 'FM'},
            { name: 'FLORIDA', abbreviation: 'FL'},
            { name: 'GEORGIA', abbreviation: 'GA'},
            { name: 'GUAM', abbreviation: 'GU'},
            { name: 'HAWAII', abbreviation: 'HI'},
            { name: 'IDAHO', abbreviation: 'ID'},
            { name: 'ILLINOIS', abbreviation: 'IL'},
            { name: 'INDIANA', abbreviation: 'IN'},
            { name: 'IOWA', abbreviation: 'IA'},
            { name: 'KANSAS', abbreviation: 'KS'},
            { name: 'KENTUCKY', abbreviation: 'KY'},
            { name: 'LOUISIANA', abbreviation: 'LA'},
            { name: 'MAINE', abbreviation: 'ME'},
            { name: 'MARSHALL ISLANDS', abbreviation: 'MH'},
            { name: 'MARYLAND', abbreviation: 'MD'},
            { name: 'MASSACHUSETTS', abbreviation: 'MA'},
            { name: 'MICHIGAN', abbreviation: 'MI'},
            { name: 'MINNESOTA', abbreviation: 'MN'},
            { name: 'MISSISSIPPI', abbreviation: 'MS'},
            { name: 'MISSOURI', abbreviation: 'MO'},
            { name: 'MONTANA', abbreviation: 'MT'},
            { name: 'NEBRASKA', abbreviation: 'NE'},
            { name: 'NEVADA', abbreviation: 'NV'},
            { name: 'NEW HAMPSHIRE', abbreviation: 'NH'},
            { name: 'NEW JERSEY', abbreviation: 'NJ'},
            { name: 'NEW MEXICO', abbreviation: 'NM'},
            { name: 'NEW YORK', abbreviation: 'NY'},
            { name: 'NORTH CAROLINA', abbreviation: 'NC'},
            { name: 'NORTH DAKOTA', abbreviation: 'ND'},
            { name: 'NORTHERN MARIANA ISLANDS', abbreviation: 'MP'},
            { name: 'OHIO', abbreviation: 'OH'},
            { name: 'OKLAHOMA', abbreviation: 'OK'},
            { name: 'OREGON', abbreviation: 'OR'},
            { name: 'PALAU', abbreviation: 'PW'},
            { name: 'PENNSYLVANIA', abbreviation: 'PA'},
            { name: 'PUERTO RICO', abbreviation: 'PR'},
            { name: 'RHODE ISLAND', abbreviation: 'RI'},
            { name: 'SOUTH CAROLINA', abbreviation: 'SC'},
            { name: 'SOUTH DAKOTA', abbreviation: 'SD'},
            { name: 'TENNESSEE', abbreviation: 'TN'},
            { name: 'TEXAS', abbreviation: 'TX'},
            { name: 'UTAH', abbreviation: 'UT'},
            { name: 'VERMONT', abbreviation: 'VT'},
            { name: 'VIRGIN ISLANDS', abbreviation: 'VI'},
            { name: 'VIRGINIA', abbreviation: 'VA'},
            { name: 'WASHINGTON', abbreviation: 'WA'},
            { name: 'WEST VIRGINIA', abbreviation: 'WV'},
            { name: 'WISCONSIN', abbreviation: 'WI'},
            { name: 'WYOMING', abbreviation: 'WY' }
        ];


        this.auth = this.$firebaseSimpleLogin(this.MainRef);
        this.auth.$getCurrentUser().then((user)=> {
            this.isLoggedIn = true;
            if (user === null) {
                return;
            }
            if (_.isUndefined(user.email))user.email = user.id;

            this.Breedership(this.FireProcess(user.email)).then(() => {
                this.userName = user.email;
                this.isLoggedIn = true;

                this.userNameFire = this.FireProcess(this.userName);
            });
        });
    }

    Signin(email:string, pass:string) {
        this.auth = this.$firebaseSimpleLogin(this.MainRef);

        this.auth.$login('password', {
            email: email,
            password: pass

        }).then((user)=> {
            this.Breedership(this.FireProcess(user.email)).then(() => {
                this.userName = user.email;
                this.isLoggedIn = true;

                this.userNameFire = this.FireProcess(this.userName);

                this.isLoggedIn = true;
                if (this.isBreeder === true) {
                    this.$state.go('user.profile.about1', {uname: user.email});
                }

                if (this.isBreeder === false) {
                    this.$state.go('looker.account', {uname: user.email});
                }
            })
        });
    }

    Breedership(email:string) {
        var d = this.$q.defer();

        var breederUrl = this.MainUrl + "breeders/" + email;
        var lookerUrl = this.MainUrl + "lookers/" + email;

        var breederRef = this.$firebase(new Firebase(breederUrl));
        var lookerRef = this.$firebase(new Firebase(lookerUrl));

        breederRef.$on('value', (snapshot:any)=> {


            var breeder = snapshot.snapshot.value;
            if (!_.isNull(breeder) && !_.isUndefined(breeder.profile)) {
                this.nickName = breeder.profile.UserName;
                this.nickNameFire = this.FireProcess(this.nickName);
                this.isBreeder = true;
                this.isAdmin = breeder.profile.isAdmin;

                var subscriptionUrl = this.MainUrl + 'breeders/' + this.FireProcess(breeder.profile.Email) + '/subscriptions';
                var subscriptionRef = this.$firebase(new Firebase(subscriptionUrl));
                subscriptionRef.$on('value', (snapshot:any)=> {
                    var subscription = snapshot.snapshot.value;
                    this.subscription = this.$filter('orderByPriority')(subscription)[0];
                });


                d.resolve();
            }
        });
        lookerRef.$on('value', (snapshot:any)=> {
            var looker = snapshot.snapshot.value;
            if (!_.isNull(looker) && !_.isUndefined(looker.profile)) {
                this.nickName = looker.profile.UserName;
                this.nickNameFire = this.FireProcess(this.nickName);
                this.isBreeder = false;
                d.resolve();
            }
        });
        return d.promise;
    }

    followUser(loggedUser:string, follower:string) {
        this.DataService.followUser(loggedUser, follower).then(()=> {

            this.$scope.home.AddToFollowings(follower);
        })
    }

    unFollowUser(loggedUser:string, follower:string) {
        this.DataService.unFollowUser(loggedUser, follower).then(()=> {
            this.$scope.home.RemoveFromFollowings(follower);
        })
    }


    AddToFollowings(userName:string) {
        this.Followings.push(this.FireUnProcess(userName));
    }

    RemoveFromFollowings(userName:string) {
        var index = this.Followings.indexOf(this.FireUnProcess(userName))
        this.Followings.splice(index, 1);
    }

    FireProcess(userName:string) {
        if (_.isUndefined(userName)) return;
        return userName.replace(/\./g, '(p)');

    }

    FireUnProcess(userName:string) {
        if (_.isUndefined(userName)) return;
        return userName.replace(/\(p\)/g, '.');

    }

    animationDirection(menuIndex:number):string {

        if (menuIndex > this.menuIndex)
            return 'slide-left';
        else
            return 'slide-right';
    }


    Logout() {
        this.auth.$logout();
        this.isLoggedIn = false;
        this.auth.user = null;
//        this.auth = null;


        this.$state.go('home');
    }

    IsSearchHidden:boolean;

    ShowSuccess(note:string) {
        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }


    Ownership() {
        var breederUserName:string = this.$stateParams.uname;
        if (this.auth.user === null)
            return false;
        this.isOwner = (breederUserName === this.auth.user.email) || (breederUserName === this.auth.user.id);
        return this.isOwner;
    }

    navigate(menuIndex:number) {
        this.$scope.slide = this.animationDirection(menuIndex);


        if (menuIndex == 1) {
            this.menuIndex = 1;
            this.$state.go("user.profile.about1");
        }


        if (menuIndex == 2) {
            this.menuIndex = 2;
            this.$state.go('user.profile.photos2');
        }


        if (menuIndex == 3) {
            this.url = 'puppies';
            this.menuIndex = 3;
            this.$state.go('user.profile.puppies3');
        }


        if (menuIndex == 4) {
            this.url = 'details';
            this.menuIndex = 4;
            this.$state.go('user.profile.details4');
        }


        if (menuIndex == 5) {
            this.url = 'testimonials';
            this.menuIndex = 5;
            this.$state.go('user.profile.testimonials5');
        }

    }

}