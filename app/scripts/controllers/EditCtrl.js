/// <reference path="IndexCtrl.ts" />
/// <reference path="../models/IBreederProfile.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angular-ui/angular-ui-router.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/toastr/toastr.d.ts" />
/// <reference path="../services/CopyProfileService.ts" />
/// <reference path="../app.ts" />
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
    EditCtrl.prototype.Save = function () {
        var _this = this;
        //Run Service UpdateProfile Method and get promise back
        var promise = this.DataService.updateProfile(this.BreederProfileEdit);

        //resolving promise
        promise.then(function () {
            // Success
            _this.ShowSuccess('Successfully Saved');
        }, function () {
            // Error
            _this.ShowError('Db Connection Problem');
        });
    };

    EditCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
        this.CopyProfileService.SetProfile(this.BreederProfileEdit);
        this.$scope.index.UpdateBreederProfile(this.BreederProfileEdit);

        this.$state.go('profile');
    };

    EditCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return EditCtrl;
})();
//# sourceMappingURL=EditCtrl.js.map
