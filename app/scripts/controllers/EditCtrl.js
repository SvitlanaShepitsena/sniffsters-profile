/// <reference path="../../bower_components/dt-angular/angular.d.ts" />
/// <reference path="IndexCtrl.ts" />
/// <reference path="../../../dist/bower_components/dt-toastr/toastr.d.ts" />
/// <reference path="../models/IBreederProfile.ts" />
/// <reference path="../services/CopyProfileService.ts" />
/// <reference path="../app.ts" />
var EditCtrl = (function () {
    function EditCtrl($scope, toastr, DataService, CopyProfileService) {
        this.toastr = toastr;
        this.DataService = DataService;
        this.CopyProfileService = CopyProfileService;
        this.BreederProfileEdit = new BreederProfile();
        $scope.edit = this;

        this.BreederProfileEdit = this.CopyProfileService.GetProfile();
        //        console.log(CopyProfileService);
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
    };

    EditCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return EditCtrl;
})();
//# sourceMappingURL=EditCtrl.js.map
