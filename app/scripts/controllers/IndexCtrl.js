/// <reference path="../services/CopyProfileService.ts" />
/// <reference path="../models/IBreederProfile.ts" />
/// <reference path="../services/DataService.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angular-ui/angular-ui-router.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/toastr/toastr.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase-simplelogin.d.ts" />
var IndexCtrl = (function () {
    function IndexCtrl($scope, settings, $stateParams, $rootScope, $window, toastr, DataService, CopyProfileService) {
        var _this = this;
        this.$scope = $scope;
        this.settings = settings;
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

        this.spinner = true;

        this.$scope.home.auth.$getCurrentUser().then(function (user) {
            _this.$scope.home.Breedership(_this.$scope.home.FireProcess(user.email)).then(function () {
                var requestEmail = $stateParams.uname;

                if (requestEmail == "public") {
                    requestEmail = $scope.home.userName;
                }
                var promiseT = _this.DataService.getProfile(requestEmail);
                promiseT.then(function (breederProfile) {
                    //Success
                    $scope.home.Ownership();
                    _this.error = false;
                    _this.BreederProfile = breederProfile;

                    _this.CopyProfileService.SetProfile(breederProfile);
                    _this.BreederProfileEdit = CopyProfileService.GetProfileClone();
                }, function () {
                    //Error
                    _this.error = true;
                    _this.ShowError("Error in Db Connection");
                }).finally(function () {
                    _this.spinner = false;
                });
            });
        });
    }
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
        breederProfile.Location = breederProfile.City + ', ' + breederProfile.State;
        breederProfile = _.omit(breederProfile, 'breeds');

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
