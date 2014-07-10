var IndexCtrl = (function () {
    function IndexCtrl($scope, $stateParams, $rootScope, $window, toastr, DataService, CopyProfileService) {
        var _this = this;
        this.$scope = $scope;
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

        $scope.home.Ownership();

        this.spinner = true;
        this.BreederName = this.GetBreederName();
        this.Id = this.GetBreederName();
        this.IdFire = this.Id.replace(/\./g, '(p)');

        var promiseT = this.DataService.getProfile($stateParams.uname);
        promiseT.then(function (breederProfile) {
            _this.error = false;
            _this.BreederProfile = breederProfile;

            _this.CopyProfileService.SetProfile(breederProfile);
            _this.BreederProfileEdit = CopyProfileService.GetProfileClone();
        }, function () {
            _this.error = true;
            _this.ShowError("Error in Db Connection");
        }).finally(function () {
            _this.spinner = false;
        });
    }

    IndexCtrl.prototype.GetBreederName = function () {
        var loggedUser = angular.element('#loggedUser');
        if (loggedUser == null) {
            return '';
        }
        var loggedUserTxt = loggedUser.text();

        var start = loggedUserTxt.indexOf(',') + 1;
        var finish = loggedUserTxt.indexOf('!');

        var userName = loggedUserTxt.substr(start, finish - start).trim();

        return userName;
    };

    IndexCtrl.prototype.SaveKennelName = function () {
        var breederProfileOriginal = this.CopyProfileService.GetProfileClone();

        breederProfileOriginal.KennelName = this.BreederProfileEdit.KennelName;
        breederProfileOriginal.Story = this.BreederProfileEdit.Story;
        this.Save(breederProfileOriginal);
    };

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
        this.DataService.updateProfile(breederProfile).then(function () {
            _this.CopyProfileService.SetProfile(breederProfile);

            _this.UpdateBreederProfile(breederProfile);

            _this.ShowSuccess('Successfully Saved');
        }, function () {
            _this.ShowError('Db Connection Problem');
        });
    };
    return IndexCtrl;
})();
