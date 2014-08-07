/// <reference path="../services/CopyProfileService.ts" />
/// <reference path="../models/IBreederProfile.ts" />
/// <reference path="../services/DataService.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angular-ui/angular-ui-router.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/toastr/toastr.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase-simplelogin.d.ts" />

interface IMainScope extends ng.IScope {
    index:IndexCtrl;
}
class IndexCtrl {
    BreederProfile:IBreederProfile;
    BreederProfileEdit:IBreederProfile;

    subscription:any;

    BreederProfileCopy:IBreederProfile;
    error:boolean;
    Id:string;
    IdFire:string;
    state:string;
    spinner:boolean;
    BreederName:string;
    url:string;
    isOwner:boolean;
    messagesNumber:number;
    unReadMessagesNumber:number;

    constructor(public $scope, public $firebase, public $filter, public settings, $stateParams, public $rootScope, public $window, public toastr, public DataService:DataService, public CopyProfileService:CopyProfileService) {

        $scope.index = this;
        $scope.home.IsSearchHidden = false;
        $scope.home.url = 'about';
        $scope.home.hideMenu = false;
        $scope.slide = '';

        this.spinner = true;

        this.$scope.home.auth.$getCurrentUser().then((user) => {
            this.$scope.home.Breedership(this.$scope.home.FireProcess(user.email)).then(() => {

                var requestEmail = $stateParams.uname;

                if (requestEmail == "public") {
                    requestEmail = $scope.home.userName;
                }
                var promiseT = this.DataService.getProfile(requestEmail);
                promiseT.then((breederProfile:IBreederProfile) => {
                    //Success
                    var ownership = $scope.home.Ownership();
                    if (ownership) {
                        var messagesUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.userNameFire + '/messages';

                        this.subscription = $scope.home.subscription;


                        var messagesRef = $firebase(new Firebase(messagesUrl));
                            this.messagesNumber = messagesRef.$getIndex().length;

                            messagesRef.$on('value', (snapshot:any)=> {
                                var messages = snapshot.snapshot.value;
                                var messagesArr = $filter('orderByPriority')(messages);
                                var unReadMessages = _.where(messagesArr, {isUnread: true});
                                this.unReadMessagesNumber = unReadMessages.length;


                            });

                    }


                    this.error = false;
                    this.BreederProfile = breederProfile;
                    this.BreederName = breederProfile.UserName;


                    this.CopyProfileService.SetProfile(breederProfile);
                    this.BreederProfileEdit = CopyProfileService.GetProfileClone();

                }, () => {
                    //Error
                    this.error = true;
                    this.ShowError("Error in Db Connection")
                }).finally(() => {
                    this.spinner = false;
                })
            })
        })
    }

    GetBreederName() {
        return this.BreederProfile;
    }

    SaveKennelName() {
        var breederProfileOriginal:IBreederProfile = this.CopyProfileService.GetProfileClone();

        breederProfileOriginal.KennelName = this.BreederProfileEdit.KennelName;
        breederProfileOriginal.Story = this.BreederProfileEdit.Story;
        this.Save(breederProfileOriginal);
    }


    /* =DETAILS*/

    SavePersonalInfo() {
        var breederProfileOriginal:IBreederProfile = this.CopyProfileService.GetProfileClone();

        breederProfileOriginal.KennelName = this.BreederProfileEdit.KennelName;
        breederProfileOriginal.Website = this.BreederProfileEdit.Website;
        breederProfileOriginal.Email = this.BreederProfileEdit.Email;
        breederProfileOriginal.Phone = this.BreederProfileEdit.Phone;
        this.Save(breederProfileOriginal);
    }

    SaveLocation() {
        var breederProfileOriginal:IBreederProfile = this.CopyProfileService.GetProfileClone();

        breederProfileOriginal.City = this.BreederProfileEdit.City;
        breederProfileOriginal.Zip = this.BreederProfileEdit.Zip;
        breederProfileOriginal.State = this.BreederProfileEdit.State;
        this.Save(breederProfileOriginal);
    }

    SaveSpecifics() {
        var breederProfileOriginal:IBreederProfile = this.CopyProfileService.GetProfileClone();

        breederProfileOriginal.Certifications = this.BreederProfileEdit.Certifications;
        breederProfileOriginal.Insurances = this.BreederProfileEdit.Insurances;
        this.Save(breederProfileOriginal);
    }

    ShowError(errorMessage:string) {
        this.toastr.error(errorMessage);
    }

    ShowSuccess(successMessage:string) {
        this.toastr.success(successMessage);
    }

    Clone() {
        this.BreederProfileCopy = this.CopyProfileService.GetProfileClone();
    }

    GetClone() {
        return this.CopyProfileService.GetProfileClone();
    }

    UpdateBreederProfile(breederProfile:IBreederProfile) {
        this.BreederProfile = breederProfile;
    }

    Save(breederProfile:IBreederProfile) {

        breederProfile.Location = breederProfile.City + ', ' + breederProfile.State;
        breederProfile = _.omit(breederProfile, 'breeds');
//Run Service UpdateProfile Method and get promise back
        this.DataService.updateProfile(breederProfile).then(
            () => {
                // Success
                this.CopyProfileService.SetProfile(breederProfile);
//                Update scope on IndexCtrl.
                this.UpdateBreederProfile(breederProfile);

                this.ShowSuccess(this.settings.dataSaved);
            },
            () => {
                // Error
                this.ShowError(this.settings.dbError);
            });
    }
}
