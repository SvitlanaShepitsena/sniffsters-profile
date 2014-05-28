/// <reference path="../services/CopyProfileService.ts" />
/// <reference path="../models/IBreederProfile.ts" />
/// <reference path="../services/DataService.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angular-ui/angular-ui-router.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/toastr/toastr.d.ts" />
var IndexCtrl = (function () {
    function IndexCtrl($scope, $state, toastr, DataService, CopyProfileService) {
        var _this = this;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        this.CopyProfileService = CopyProfileService;
        $scope.index = this;
        var promiseT = this.DataService.getProfile();

        promiseT.then(function (breederProfile) {
            //Success
            _this.error = false;
            _this.BreederProfile = breederProfile;

            //            Put a received BreederProfile to CopyProfileService, using it like container
            //            in order we can inject CopyProfileService in other Ctrls and have access to BreederProfile Data (SHaring data between controllers)
            _this.CopyProfileService.SetProfile(breederProfile);
            _this.BreederProfileEdit = CopyProfileService.GetProfileClone();
        }, function () {
            //Error
            _this.error = true;
            _this.ShowError("Error in Db Connection");
        });
    }
    IndexCtrl.prototype.ShowError = function (errorMessage) {
        this.toastr.error(errorMessage);
    };

    IndexCtrl.prototype.ShowSuccess = function (successMessage) {
        this.toastr.success(successMessage);
    };

    IndexCtrl.prototype.Clone = function () {
        this.BreederProfileCopy = this.CopyProfileService.GetProfileClone();
    };

    IndexCtrl.prototype.UpdateBreederProfile = function (breederProfile) {
        this.BreederProfile = breederProfile;
    };

    IndexCtrl.prototype.Save = function () {
        var _this = this;
        var promise = this.DataService.updateProfile(this.BreederProfileCopy);

        //resolving promise
        promise.then(function () {
            // Success
            _this.BreederProfile = _this.BreederProfileCopy;

            //                Any time we change information on server we need to update our BreederProfile inside a container.
            _this.CopyProfileService.SetProfile(_this.BreederProfileCopy);
            _this.ShowSuccess('Successfully saved');
        }, function () {
            // Error
            _this.ShowError('Db Connection Problem');
        });
    };
    return IndexCtrl;
})();
//# sourceMappingURL=IndexCtrl.js.map
