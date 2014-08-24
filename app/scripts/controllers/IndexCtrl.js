/// <reference path="../services/CopyProfileService.ts" />
/// <reference path="../models/IBreederProfile.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/underscore/underscore.d.ts" />
/// <reference path="../services/DataService.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angular-ui/angular-ui-router.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/toastr/toastr.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase-simplelogin.d.ts" />
var IndexCtrl = (function () {
    function IndexCtrl($scope, $firebase, FinduserService, $filter, settings, $location, $stateParams, $rootScope, $window, toastr, DataService, CopyProfileService) {
        var _this = this;
        this.$scope = $scope;
        this.$firebase = $firebase;
        this.FinduserService = FinduserService;
        this.$filter = $filter;
        this.settings = settings;
        this.$stateParams = $stateParams;
        this.$rootScope = $rootScope;
        this.$window = $window;
        this.toastr = toastr;
        this.DataService = DataService;
        this.CopyProfileService = CopyProfileService;
        $scope.index = this;
        $scope.home.IsSearchHidden = false;
        $scope.home.url = 'about';
        $scope.home.hideMenu = false;
        $scope.slide = '';
        $scope.home.IsHome = false;

        this.spinner = true;

        var requestEmail = $stateParams.uname;

        var requestEmailFire = $scope.home.FireProcess(requestEmail);
        var requestedBreederRef = $firebase(new Firebase($scope.home.MainUrl + 'breeders/' + requestEmailFire + "/profile"));

        var breederProfile;
        requestedBreederRef.$on('value', function (snapshot) {
            breederProfile = snapshot.snapshot.value;
            _this.BreederProfile = breederProfile;

            _this.error = false;
            _this.BreederProfile = breederProfile;

            //            this.BreederName = breederProfile.UserName;
            _this.CopyProfileService.SetProfile(breederProfile);
            _this.BreederProfileEdit = CopyProfileService.GetProfileClone();
            _this.spinner = false;
            $scope.home.isLoadFinished = true;
        });

        this.$scope.home.auth.$getCurrentUser().then(function (user) {
            if (_.isNull(user)) {
                return;
            }

            if (_.isUndefined(user.email))
                user.email = user.id;
            _this.spinner = false;
            var viewAsUser;
            if (!_.isUndefined($stateParams.asuser) && $stateParams.asuser == '/as-user') {
                viewAsUser = true;
            }

            var ownership;

            if (_this.$scope.home.auth.user === null) {
                ownership = false;
                _this.$scope.home.isOwner = false;
            } else {
                var breederUserName = _this.$stateParams.uname;
                _this.FinduserService.findByEmail(user.email).then(function (userProfile) {
                    ownership = breederUserName == userProfile.UserName;
                    _this.$scope.home.isOwner = ownership;

                    //Success
                    if (ownership) {
                        _this.subscription = $scope.home.subscription;

                        // Messages Count
                        var messagesUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.FireProcess(user.email) + '/messages';
                        var messagesRef = $firebase(new Firebase(messagesUrl));

                        // Galleries Count
                        var galleriesUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.FireProcess(user.email) + '/galleries';

                        var galleriesRef = $firebase(new Firebase(galleriesUrl));
                        galleriesRef.$on('value', function (snapshot) {
                            _this.galleriesNumber = _.values(snapshot.snapshot.value).length;
                        });

                        // Messages Count
                        var littersUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.FireProcess(user.email) + '/litters';
                        var littersRef = $firebase(new Firebase(littersUrl));
                        littersRef.$on('value', function (snapshot) {
                            _this.littersNumber = _.values(snapshot.snapshot.value).length;
                        });

                        messagesRef.$on('value', function (snapshot) {
                            var messages = snapshot.snapshot.value;
                            var messagesArr = $filter('orderByPriority')(messages);
                            _this.messagesNumber = messagesArr.length;
                            var unReadMessages = _.where(messagesArr, {isUnread: true});
                            _this.unReadMessagesNumber = unReadMessages.length;
                        });
                    }
                });
            }
            var feedbacksUrl = $scope.home.MainUrl + 'breeders/' + _this.$scope.home.FireProcess(requestEmail) + '/feedbacks';
            var feedbacksRef = $firebase(new Firebase(feedbacksUrl));
            var feedbacksKeys = feedbacksRef.$getIndex();
            var total = 0;
            var numb = 0;
            feedbacksKeys.forEach(function (key) {
                var feedback = feedbacksRef[key];

                if (feedback.hasOwnProperty('Evaluation') && feedback.Evaluation > 0) {
                    total += feedback.Evaluation;
                    numb++;
                }
            });

            _this.rating = numb > 0 ? Math.ceil(total / numb) : 0;
        });
    }
    IndexCtrl.prototype.GetBreederName = function () {
        return this.BreederProfile;
    };

    IndexCtrl.prototype.SaveKennelName = function () {
        var breederProfileOriginal = this.CopyProfileService.GetProfileClone();

        breederProfileOriginal.KennelName = this.BreederProfileEdit.KennelName;
        breederProfileOriginal.Story = this.BreederProfileEdit.Story;
        this.Save(breederProfileOriginal);
    };

    /* =DETAILS*/
    IndexCtrl.prototype.SavePersonalInfo = function () {
        var breederProfileOriginal = this.CopyProfileService.GetProfileClone();

        breederProfileOriginal.KennelName = this.BreederProfileEdit.KennelName;
        breederProfileOriginal.Website = this.BreederProfileEdit.Website;
        breederProfileOriginal.Email = this.BreederProfileEdit.Email;
        breederProfileOriginal.Phone = this.BreederProfileEdit.Phone;
        this.Save(breederProfileOriginal);
    };

    IndexCtrl.prototype.SaveLocation = function () {
        var breederProfileOriginal = this.CopyProfileService.GetProfileClone();

        breederProfileOriginal.City = this.BreederProfileEdit.City;
        breederProfileOriginal.Zip = this.BreederProfileEdit.Zip;
        breederProfileOriginal.State = this.BreederProfileEdit.State;
        this.Save(breederProfileOriginal);
    };

    IndexCtrl.prototype.SaveSpecifics = function () {
        var breederProfileOriginal = this.CopyProfileService.GetProfileClone();

        breederProfileOriginal.Certifications = this.BreederProfileEdit.Certifications;
        breederProfileOriginal.Insurances = this.BreederProfileEdit.Insurances;
        this.Save(breederProfileOriginal);
    };

    IndexCtrl.prototype.ShowError = function (errorMessage) {
        this.toastr.error(errorMessage);
    };

    IndexCtrl.prototype.ShowSuccess = function (successMessage) {
        this.toastr.success(successMessage);
    };

    IndexCtrl.prototype.Clone = function () {
        this.BreederProfileCopy = this.CopyProfileService.GetProfileClone();
    };

    IndexCtrl.prototype.GetClone = function () {
        return this.CopyProfileService.GetProfileClone();
    };

    IndexCtrl.prototype.UpdateBreederProfile = function (breederProfile) {
        this.BreederProfile = breederProfile;
    };

    IndexCtrl.prototype.Save = function (breederProfile) {
        var _this = this;
        breederProfile.Location = (breederProfile.City != '' && breederProfile.State != '') ? breederProfile.City + ', ' + breederProfile.State : '';

        //        breederProfile = _.omit(breederProfile, 'breeds');
        //Run Service UpdateProfile Method and get promise back
        this.DataService.updateProfile(breederProfile).then(function () {
            // Success
            _this.CopyProfileService.SetProfile(breederProfile);

            //                Update scope on IndexCtrl.
            _this.UpdateBreederProfile(breederProfile);

            _this.ShowSuccess(_this.settings.dataSaved);
        }, function () {
            // Error
            _this.ShowError(_this.settings.dbError);
        });
    };
    return IndexCtrl;
})();
