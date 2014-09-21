/// <reference path="IndexCtrl.ts" />
/// <reference path="../utils/IUserGenerator.ts" />
/// <reference path="../utils/BreederGenerator.ts" />
/// <reference path="../utils/LookerGenerator.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase-simplelogin.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angularfire/angularfire.d.ts" />
/// <reference path="../services/UnamebyemailService.ts" />

interface IHomeScope extends IMainScope {
  home:HomeCtrl;
  ctrl:IndexCtrl;
}
class HomeCtrl {
  nickName:any
  nickNameFire:any
  userName:any;
  userNameFire:string;
  isLoadFinished:boolean;
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

  constructor(public $rootScope, public $window, public $popover, public $scope, public $modal, public FinduserService, public settings, public $filter, public $stateParams, public $q:ng.IQService, public $firebase, public $firebaseSimpleLogin, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
    var decrement = 270;
    $scope.height = window.screen.height - decrement;
    $scope.h2 = window.innerHeight;
    $(window).resize(function () {

      $scope.$apply(function () {
        $scope.height = window.screen.height - decrement;
        $scope.h2 = window.innerHeight;

      });
    });
    $scope.lpShown = true;
    $scope.rpShown = true;
    $scope.noGalleryNotice = settings.noGalleryNotice;
    $scope.noFollowers = settings.noFollowers;
    $scope.noFollowing = settings.noFollowing;
    $scope.noLitterNotice = settings.noLitterNotice;
    $scope.upgradeSubscription = settings.upgradeSubscription;

    $scope.registerPopover = () => {
      $scope.rpShown = true;
      $scope.lpShown = false;
    }

    $scope.loginPopover = () => {
      $scope.lpShown = true;
      $scope.rpShown = false;
    }

    this.Followings = [];
    $scope.searchLocation = {};
    $scope.searchBreed = {};
    $scope.username = {};
    $scope.userExists = false;


    $rootScope.$on('$stateChangeSuccess',
      function (event, toState, toParams, fromState, fromParams) {
        this.url2 = toState.name;
      })

    $scope.home = this;
//        this.menuIndex = 1;
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
    $scope.register = (email:string, pass:string, confpass:string, isBreeder:boolean) => {


      if (pass.length < 5) {
        this.ShowError("Password should be not less than 5 symbols");
        return;
      }

      if (pass !== confpass) {
        this.ShowError("Passwords do not match");
        return;
      }

      FinduserService.findByEmail(email).then(()=> {
        $scope.userExists = true;
        this.ShowError(settings.userExists);
        return;
      }, () => {
        //email is free


        $scope.emailReg = email;
        $scope.passwordReg = pass;
        $scope.isNewBreederReg = isBreeder;

        $scope.username.val = email.split('@')[0];

        $scope.modalUser = $modal(
          {
            scope: $scope,
            title: 'Choose your username',
            template: '../views/modals/choose-username.html',
            show: true
          }
        );

      });

    }


    $scope.setUsername = (username) => {

      FinduserService.find(username).then(()=> {
        $scope.userExists = true;
        this.ShowError(settings.userExists);
      }, () => {

        $scope.home.auth.$createUser($scope.emailReg, $scope.passwordReg).then(() => {

          if ($scope.isNewBreederReg) {
            var breederGenerator = new BreederGenerator();
            breederGenerator.create($scope.home.FireProcess($scope.emailReg), $scope.home.MainUrl, this.$firebase, username);
          } else {
            var lookerGenerator = new LookerGenerator();
            lookerGenerator.create($scope.home.FireProcess($scope.emailReg), $scope.home.MainUrl, this.$firebase, username);
          }

          $scope.home.Signin($scope.emailReg, $scope.passwordReg)
        }, (error)=> {
          this.ShowError(error);
        })


        $scope.modalUser.hide();
      });
    }


    $scope.fetchDog = ()=> {
      if (!_.isUndefined($scope.searchLocation.val) && $scope.searchLocation.val.length > 2) {
        var locationShort:any = _.where($scope.states, {name: $scope.searchLocation.val})[0];
        $scope.searchLocation.val = locationShort;
      }
      $state.go('sniff.breeders', {
        breed: $scope.searchBreed.val,
        location: $scope.searchLocation.val
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
      {name: 'ALABAMA', abbreviation: 'AL'},
      {name: 'ALASKA', abbreviation: 'AK'},
      {name: 'AMERICAN SAMOA', abbreviation: 'AS'},
      {name: 'ARIZONA', abbreviation: 'AZ'},
      {name: 'ARKANSAS', abbreviation: 'AR'},
      {name: 'CALIFORNIA', abbreviation: 'CA'},
      {name: 'COLORADO', abbreviation: 'CO'},
      {name: 'CONNECTICUT', abbreviation: 'CT'},
      {name: 'DELAWARE', abbreviation: 'DE'},
      {name: 'DISTRICT OF COLUMBIA', abbreviation: 'DC'},
      {name: 'FEDERATED STATES OF MICRONESIA', abbreviation: 'FM'},
      {name: 'FLORIDA', abbreviation: 'FL'},
      {name: 'GEORGIA', abbreviation: 'GA'},
      {name: 'GUAM', abbreviation: 'GU'},
      {name: 'HAWAII', abbreviation: 'HI'},
      {name: 'IDAHO', abbreviation: 'ID'},
      {name: 'ILLINOIS', abbreviation: 'IL'},
      {name: 'INDIANA', abbreviation: 'IN'},
      {name: 'IOWA', abbreviation: 'IA'},
      {name: 'KANSAS', abbreviation: 'KS'},
      {name: 'KENTUCKY', abbreviation: 'KY'},
      {name: 'LOUISIANA', abbreviation: 'LA'},
      {name: 'MAINE', abbreviation: 'ME'},
      {name: 'MARSHALL ISLANDS', abbreviation: 'MH'},
      {name: 'MARYLAND', abbreviation: 'MD'},
      {name: 'MASSACHUSETTS', abbreviation: 'MA'},
      {name: 'MICHIGAN', abbreviation: 'MI'},
      {name: 'MINNESOTA', abbreviation: 'MN'},
      {name: 'MISSISSIPPI', abbreviation: 'MS'},
      {name: 'MISSOURI', abbreviation: 'MO'},
      {name: 'MONTANA', abbreviation: 'MT'},
      {name: 'NEBRASKA', abbreviation: 'NE'},
      {name: 'NEVADA', abbreviation: 'NV'},
      {name: 'NEW HAMPSHIRE', abbreviation: 'NH'},
      {name: 'NEW JERSEY', abbreviation: 'NJ'},
      {name: 'NEW MEXICO', abbreviation: 'NM'},
      {name: 'NEW YORK', abbreviation: 'NY'},
      {name: 'NORTH CAROLINA', abbreviation: 'NC'},
      {name: 'NORTH DAKOTA', abbreviation: 'ND'},
      {name: 'NORTHERN MARIANA ISLANDS', abbreviation: 'MP'},
      {name: 'OHIO', abbreviation: 'OH'},
      {name: 'OKLAHOMA', abbreviation: 'OK'},
      {name: 'OREGON', abbreviation: 'OR'},
      {name: 'PALAU', abbreviation: 'PW'},
      {name: 'PENNSYLVANIA', abbreviation: 'PA'},
      {name: 'PUERTO RICO', abbreviation: 'PR'},
      {name: 'RHODE ISLAND', abbreviation: 'RI'},
      {name: 'SOUTH CAROLINA', abbreviation: 'SC'},
      {name: 'SOUTH DAKOTA', abbreviation: 'SD'},
      {name: 'TENNESSEE', abbreviation: 'TN'},
      {name: 'TEXAS', abbreviation: 'TX'},
      {name: 'UTAH', abbreviation: 'UT'},
      {name: 'VERMONT', abbreviation: 'VT'},
      {name: 'VIRGIN ISLANDS', abbreviation: 'VI'},
      {name: 'VIRGINIA', abbreviation: 'VA'},
      {name: 'WASHINGTON', abbreviation: 'WA'},
      {name: 'WEST VIRGINIA', abbreviation: 'WV'},
      {name: 'WISCONSIN', abbreviation: 'WI'},
      {name: 'WYOMING', abbreviation: 'WY'}
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
        this.userNameFire = this.FireProcess(this.userName);
        this.isLoggedIn = true;

      });
    });
  }

  Signin(email:string, pass:string) {
    this.auth = this.$firebaseSimpleLogin(this.MainRef);

    this.auth.$login('password', {
      email: email,
      password: pass

    }).then((user)=> {
      if (!_.isUndefined(this.$scope.modalLogin)) {
        this.$scope.modalLogin.hide();
      }

      this.Breedership(this.FireProcess(user.email)).then(() => {
        this.FinduserService.findByEmail(user.email).then((userProfile)=> {

          this.userName = userProfile.UserName;
          this.isLoggedIn = true;
          this.userNameFire = this.FireProcess(this.userName);

          this.nickName = userProfile.UserName;
          console.log(this.nickName);
          this.isLoggedIn = true;
          if (this.isBreeder === true) {
            this.$state.go('user.profile.about1', {uname: this.nickName}, {reload: true});
          }

          if (this.isBreeder === false) {
            this.$state.go('looker.account', {uname: this.nickName}, {reload: true});
          }
        })
      })
    }, () => {
      this.ShowError('Your login or password was entered incorrectly.');
      this.$scope.incorrectCredentials = true;
    });
  }

  Breedership(userName:string) {
    var d = this.$q.defer();

    if (userName == 'no') {
      d.resolve();
    }

    this.FinduserService.findByEmail(userName).then((user)=> {
      var userName = user.UserName;

      var breederUrl = this.MainUrl + "breeders/" + userName;
      var lookerUrl = this.MainUrl + "lookers/" + userName;

      var breederRef = this.$firebase(new Firebase(breederUrl));
      var lookerRef = this.$firebase(new Firebase(lookerUrl));

      breederRef.$on('value', (snapshot:any)=> {


        var breeder = snapshot.snapshot.value;
        if (!_.isNull(breeder) && !_.isUndefined(breeder.profile)) {
          if (breeder.hasOwnProperty('followings')) {
            this.Followings = _.map(_.keys(breeder.followings), (key)=> {
              return this.FireUnProcess(key);
            });
          }


          this.nickName = breeder.profile.UserName;
          this.nickNameFire = this.FireProcess(this.nickName);

          this.userName = this.nickName;
          this.userNameFire = this.nickNameFire;

          this.isBreeder = true;
          this.isAdmin = breeder.profile.isAdmin;

          var subscriptionUrl = this.MainUrl + 'breeders/' + this.FireProcess(breeder.profile.UserName) + '/subscriptions';
          var subscriptionRef = this.$firebase(new Firebase(subscriptionUrl));
          subscriptionRef.$on('value', (snapshot:any)=> {
            var subscription = snapshot.snapshot.value;
            this.subscription = this.$filter('orderByPriority')(subscription)[0];
          });


          d.resolve(this.nickName);
        }
      });
      lookerRef.$on('value', (snapshot:any)=> {
        var looker = snapshot.snapshot.value;
        if (!_.isNull(looker) && !_.isUndefined(looker.profile)) {
          this.nickName = looker.profile.UserName;
          this.nickNameFire = this.FireProcess(this.nickName);


          this.userName = this.nickName;
          this.userNameFire = this.nickNameFire;


          this.isBreeder = false;

          if (looker.hasOwnProperty('followings')) {
            this.Followings = _.map(_.keys(looker.followings), (key)=> {
              return this.FireUnProcess(key);
            });
          }

          d.resolve(this.nickName);
        }
      });

    })
    return d.promise;
  }

  followUser(loggedUser:string, follower:string) {
    this.DataService.followUser(loggedUser, follower, this.$scope.home.isBreeder).then(()=> {

      this.$scope.home.AddToFollowings(follower);
    })
  }

  unFollowUser(loggedUser:string, follower:string) {
    this.DataService.unFollowUser(loggedUser, follower, this.$scope.home.isBreeder).then(()=> {
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
    if (_.isUndefined(userName) || _.isNull(userName)) return;
    return userName.replace(/\./g, '(p)');

  }

  FireUnProcess(userName:string) {
    if (_.isUndefined(userName) || _.isNull(userName)) return;
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
    this.userName = null;
    this.userNameFire = null;
    this.isOwner = null;
    this.isAdmin = null;
    this.nickName = null;
    this.nickNameFire = null;


    this.$state.go('home', {}, {reload: true});
//        this.$state.reload();
  }

  IsSearchHidden:boolean;

  ShowSuccess(note:string) {
    this.toastr.info(note);
  }

  ShowError(note:string) {
    this.toastr.error(note);
  }

  //Ownership(notOwner?:boolean) {
  //
  //    if (notOwner == true) {
  //        this.isOwner = false;
  //        return false;
  //    }
  //
  //    var breederUserName:string = this.$stateParams.uname;
  //    if (this.auth.user === null)
  //        return false;
  //    this.isOwner = (breederUserName === this.nickName) || (breederUserName === this.auth.user.id);
  //    return this.isOwner;
  //}

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
