/// <reference path="IndexCtrl.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase-simplelogin.d.ts" />


interface IHomeScope extends IMainScope {
    home:HomeCtrl;
    ctrl:IndexCtrl;
    auth:FirebaseSimpleLogin
    authAction:FirebaseSimpleLogin
}
class HomeCtrl {

    FireUname:string;

    Id:string;
    IdFire:string;
    IsHome:boolean;

    url:string;
    menuIndex:number;
    isOwner:boolean;
    hideMenu:boolean;

    constructor(public $scope, $location, public $stateParams, $firebase, $firebaseSimpleLogin, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.home = this;
        this.isOwner = this.Ownership();
        this.menuIndex = 1;
        this.email = "breeder1@gmail.com";
        this.pass = "123456";
        this.hideMenu = true;
        $scope.navigate = (menuIndex:number) => {
            $scope.slide = this.animationDirection(menuIndex);
            this.hideMenu = false;


            if (menuIndex == 1) {
                this.menuIndex = 1;
                $state.go("user.profile.about1");
            }


            if (menuIndex == 2) {
                this.menuIndex = 2;
                $state.go('user.profile.photos2');
            }


            if (menuIndex == 3) {
                this.url = 'puppies';
                this.menuIndex = 3;
                $state.go('user.profile.puppies3');
            }


            if (menuIndex == 4) {
                this.url = 'details';
                this.menuIndex = 4;
                $state.go('user.profile.details4');
            }


            if (menuIndex == 5) {
                this.url = 'testimonials';
                this.menuIndex = 5;
                $state.go('user.profile.testimonials5');
            }

        }

        var fref = new Firebase("https://torid-fire-6526.firebaseio.com/");

        $scope.auth = $firebaseSimpleLogin(fref);
        $scope.authAction = new FirebaseSimpleLogin(fref, (error, user) => {
            if (error) {
                // an error occurred while attempting login
                this.ShowError(error.toString());
            } else if (user) {
//                this.FireUname = user.email;
//
            } else {
            }

        });

        this.Id = this.GetBreederName();
        this.IdFire = this.Id.replace(/\./g, '(p)');
    }


    email:string;
    pass:string;

    animationDirection(menuIndex:number):string {

        if (menuIndex > this.menuIndex)
            return 'slide-left';
        else
            return 'slide-right';
    }

    Signin(email:string, pass:string) {

        this.$scope.authAction.login('password', {
            email: email,
            password: pass
        });
    }

    Logout() {
//        console.log('Test');

        this.$scope.authAction.logout();

//        this.ShowSuccess('You were successfully logged out');
    }

    IsSearchHidden:boolean;

    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

    GetBreederName() {

        var loggedUser = angular.element('#loggedUser');
        if (loggedUser == null) {
            return '';
        }
        var loggedUserTxt:string = loggedUser.text();

        var start = loggedUserTxt.indexOf(',') + 1;
        var finish = loggedUserTxt.indexOf('!');


        return loggedUserTxt.substr(start, finish - start).trim();
//        returddn this.Id;

    }

    Ownership() {
        var breederUserName:string = this.$stateParams.uname;
        console.log(breederUserName);
        var userName = this.GetBreederName();

        if (_.isUndefined(breederUserName) || _.isNull(breederUserName)) {
            console.log("tttt");
            this.isOwner = true;
            return true;
        }


        console.log("fff");

        this.isOwner = false;
        return false;
    }
}