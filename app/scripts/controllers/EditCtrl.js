/// <reference path="IndexCtrl.ts" />
var EditCtrl = (function () {
    function EditCtrl($scope, $state, toastr, DataService, CopyProfileService) {
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        this.CopyProfileService = CopyProfileService;
        this.BreederProfileEdit = new BreederProfile();
        $scope.edit = this;

        this.BreederProfileEdit = this.CopyProfileService.GetProfileClone();
    }
    EditCtrl.prototype.Save = function (breederProfile) {
        var _this = this;
        //Run Service UpdateProfile Method and get promise back
        var promise = this.DataService.updateProfile(breederProfile);

        //resolving promise
        promise.then(function () {
            // Success
            _this.CopyProfileService.SetProfile(breederProfile);

            //                Update scope on IndexCtrl.
            _this.$scope.ctrl.UpdateBreederProfile(breederProfile);

            _this.ShowSuccess('Successfully Saved');
        }, function () {
            // Error
            _this.ShowError('Db Connection Problem');
        });
    };

    EditCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    EditCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };

    EditCtrl.prototype.GetClone = function () {
        return this.CopyProfileService.GetProfileClone();
    };
    return EditCtrl;
})();
//# sourceMappingURL=EditCtrl.js.map
