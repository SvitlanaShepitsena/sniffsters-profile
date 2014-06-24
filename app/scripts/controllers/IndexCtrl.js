var IndexCtrl = (function () {
    function IndexCtrl($scope, $location, $rootScope, $window, $state, toastr, DataService, CopyProfileService) {
        var _this = this;
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$window = $window;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        this.CopyProfileService = CopyProfileService;
        this.url = 'about';

        $scope.navigate = function (menuIndex) {
            $scope.slide = _this.animationDirection(menuIndex);

            if (menuIndex == 1) {
                _this.menuIndex = 1;
                $location.url('/profile/about');
            }

            if (menuIndex == 2) {
                _this.menuIndex = 2;
                $location.url('/profile/photos');
            }

            if (menuIndex == 3) {
                _this.url = 'puppies';
                _this.menuIndex = 3;
                $location.url('/profile/puppies');
            }

            if (menuIndex == 4) {
                _this.url = 'details';
                _this.menuIndex = 4;
                $location.url('/profile/details');
            }

            if (menuIndex == 5) {
                _this.url = 'testimonials';
                _this.menuIndex = 5;
                $location.url('/profile/testimonials');
            }
        };

        this.menuIndex = 1;
        $scope.slide = '';

        $rootScope.back = function () {
            $scope.slide = 'slide-left';
            $window.history.back();
        };

        $rootScope.forward = function () {
            $scope.slide = 'slide-right';
            $window.history.forward();
        };

        $scope.index = this;
        this.spinner = true;

        var promiseT = this.DataService.getProfile();
        promiseT.then(function (breederProfile) {
            _this.error = false;
            _this.BreederProfile = breederProfile;

            _this.Id = breederProfile.Email;

            _this.CopyProfileService.SetProfile(breederProfile);
            _this.BreederProfileEdit = CopyProfileService.GetProfileClone();
        }, function () {
            _this.error = true;
            _this.ShowError("Error in Db Connection");
        }).finally(function () {
            _this.spinner = false;
        });
    }

    IndexCtrl.prototype.animationDirection = function (menuIndex) {
        if (menuIndex > this.menuIndex)
            return 'slide-left';
        else
            return 'slide-right';
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

    IndexCtrl.prototype.Next = function (state) {
        this.$state.go(state);
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
        var promise = this.DataService.updateProfile(breederProfile);
        promise.then(function () {
            _this.CopyProfileService.SetProfile(breederProfile);

            _this.UpdateBreederProfile(breederProfile);

            _this.ShowSuccess('Successfully Saved');
        }, function () {
            _this.ShowError('Db Connection Problem');
        });
    };
    return IndexCtrl;
})();
