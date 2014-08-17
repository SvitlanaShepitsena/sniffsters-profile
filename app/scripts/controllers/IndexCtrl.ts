/// <reference path="../services/CopyProfileService.ts" />
/// <reference path="../models/IBreederProfile.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/underscore/underscore.d.ts" />
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

    rating:number;

    messagesNumber:number;
    galleriesNumber:number;
    littersNumber:number;
    unReadMessagesNumber:number;

    constructor(public $scope, public $firebase, public $filter, public settings, $location, $stateParams, public $rootScope, public $window, public toastr, public DataService:DataService, public CopyProfileService:CopyProfileService) {
        $scope.index = this;
        $scope.home.IsSearchHidden = false;
        $scope.home.url = 'about';
        $scope.home.hideMenu = false;
        $scope.slide = '';

        this.spinner = true;

        var requestEmail = $stateParams.uname;


        var requestEmailFire = $scope.home.FireProcess(requestEmail);
        var requestedBreederRef = $firebase(new Firebase($scope.home.MainUrl + 'breeders/' + requestEmailFire + "/profile"));


        var breederProfile:IBreederProfile;
        requestedBreederRef.$on('value', (snapshot:any)=> {
            breederProfile = snapshot.snapshot.value;
            this.BreederProfile = breederProfile;

            this.error = false;
            this.BreederProfile = breederProfile;
            this.BreederName = breederProfile.UserName;


            this.CopyProfileService.SetProfile(breederProfile);
            this.BreederProfileEdit = CopyProfileService.GetProfileClone();
            this.spinner = false;
            $scope.home.isLoadFinished = true;

        });


        this.$scope.home.auth.$getCurrentUser().then((user) => {

            if (_.isNull(user)) {
                return;
            }

            if (_.isUndefined(user.email))user.email = user.id;
            this.$scope.home.Breedership(this.$scope.home.FireProcess(user.email)).then(() => {
                this.spinner = false;
                var viewAsUser:boolean;
                if (!_.isUndefined($stateParams.asuser) && $stateParams.asuser == '/as-user') {
                    viewAsUser = true;
                }
                //Success
                var ownership = $scope.home.Ownership(viewAsUser);
                if (ownership) {

                    this.subscription = $scope.home.subscription;

                    // Messages Count
                    var messagesUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.userNameFire + '/messages';
                    var messagesRef = $firebase(new Firebase(messagesUrl));
                    this.messagesNumber = messagesRef.$getIndex().length;

                    // Galleries Count
                    var galleriesUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.userNameFire + '/galleries';
                    var galleriesRef = $firebase(new Firebase(galleriesUrl));
                    this.galleriesNumber = galleriesRef.$getIndex().length;

                    // Messages Count
                    var littersUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.userNameFire + '/litters';
                    var littersRef = $firebase(new Firebase(littersUrl));
                    this.littersNumber = littersRef.$getIndex().length;

                    messagesRef.$on('value', (snapshot:any)=> {
                        var messages = snapshot.snapshot.value;
                        var messagesArr = $filter('orderByPriority')(messages);
                        var unReadMessages = _.where(messagesArr, {isUnread: true});
                        this.unReadMessagesNumber = unReadMessages.length;


                    });

                }
                var feedbacksUrl = $scope.home.MainUrl + 'breeders/' + this.$scope.home.FireProcess(requestEmail) + '/feedbacks';
                var feedbacksRef = $firebase(new Firebase(feedbacksUrl));
                var feedbacksKeys = feedbacksRef.$getIndex();
                var total = 0;
                var numb = 0;
                feedbacksKeys.forEach((key)=> {
                    var feedback = feedbacksRef[key];

                    if (feedback.hasOwnProperty('Evaluation') && feedback.Evaluation > 0) {
                        total += feedback.Evaluation;
                        numb++;
                    }

                })

                this.rating = numb > 0 ? Math.ceil(total / numb) : 0;


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

        breederProfile.Location = (breederProfile.City != '' && breederProfile.State != '') ? breederProfile.City + ', ' + breederProfile.State : '';
//        breederProfile = _.omit(breederProfile, 'breeds');
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
