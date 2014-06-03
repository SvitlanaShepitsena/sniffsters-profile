var IndexCtrl = (function () {
    function IndexCtrl($scope, $state, toastr, DataService, CopyProfileService) {
        var _this = this;
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        this.CopyProfileService = CopyProfileService;
        var userName = angular.element($('#loggedUser')).html();
        var start = userName.indexOf(',') + 1;
        var finish = userName.indexOf('!');
        this.userName = userName.substr(start, finish - start).trim();

        $scope.index = this;
        var promiseT = this.DataService.getProfile();

        promiseT.then(function (breederProfile) {
            _this.error = false;
            _this.BreederProfile = breederProfile;

            _this.CopyProfileService.SetProfile(breederProfile);
            _this.BreederProfileEdit = CopyProfileService.GetProfileClone();
        }, function () {
            _this.error = true;
            _this.ShowError("Error in Db Connection");
        });
    }
    IndexCtrl.prototype.SaveKennelName = function () {
        var breederProfileOriginal = this.CopyProfileService.GetProfileClone();

        breederProfileOriginal.KennelName = this.BreederProfileEdit.KennelName;
        breederProfileOriginal.Story = this.BreederProfileEdit.Story;
        this.Save(breederProfileOriginal);
    };

    IndexCtrl.prototype.SaveAboutParents = function () {
        var breederProfileOriginal = this.CopyProfileService.GetProfileClone();

        breederProfileOriginal.Parents = this.BreederProfileEdit.Parents;
        breederProfileOriginal.Girls = this.BreederProfileEdit.Girls;
        breederProfileOriginal.Boys = this.BreederProfileEdit.Boys;
        console.log(breederProfileOriginal);

        this.Save(breederProfileOriginal);
    };

    IndexCtrl.prototype.SaveAddInfo = function () {
        var breederProfileOriginal = this.CopyProfileService.GetProfileClone();
        breederProfileOriginal.AddInfo = this.BreederProfileEdit.AddInfo;

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
    IndexCtrl.$inject = ['$scope', '$state', 'toastr', 'DataService', 'CopyProfileService'];
    return IndexCtrl;
})();
