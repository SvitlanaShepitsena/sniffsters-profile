/// <reference path="../app.ts" />
/// <reference path="../services/CopyProfileService.ts" />
/// <reference path="../models/IBreederProfile.ts" />
var IndexCtrl = (function () {
    function IndexCtrl($scope, toastr, DataService, CopyProfileService) {
        var _this = this;
        this.toastr = toastr;
        this.DataService = DataService;
        this.CopyProfileService = CopyProfileService;
        this.text = 'Text Outer Scope';
        $scope.index = this;

        var promiseT = this.DataService.getProfile();

        promiseT.then(function (breederProfile) {
            //Success
            _this.error = false;
            _this.CopyProfileService.SetProfile(breederProfile);
            _this.BreederProfile = _this.CopyProfileService.BreederProfile;
        }, function () {
            //Error
            _this.error = true;
            _this.ShowError("Error in Db Connection");
        });
    }
    IndexCtrl.prototype.ShowError = function (errorMessage) {
        this.toastr.error(errorMessage);
    };

    IndexCtrl.prototype.UpdateBreederProfile = function (breederProfile) {
        this.BreederProfile = breederProfile;
    };
    return IndexCtrl;
})();
//# sourceMappingURL=IndexCtrl.js.map
