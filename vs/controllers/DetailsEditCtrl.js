/// <reference path="IndexCtrl.ts" />
var DetailsEditCtrl = function () {
    function DetailsEditCtrl($scope, $state, toastr, DataService, CopyProfileService) {
      this.$scope = $scope;
      this.$state = $state;
      this.toastr = toastr;
      this.DataService = DataService;
      this.CopyProfileService = CopyProfileService;
      this.BreederProfileEdit = new BreederProfile();
      $scope.DetailsEdit = this;
      this.BreederProfileEdit = this.CopyProfileService.GetProfileClone();
    }
    DetailsEditCtrl.prototype.ShowSuccess = function (note) {
      this.toastr.info(note);
    };
    DetailsEditCtrl.prototype.ShowError = function (note) {
      this.toastr.error(note);
    };
    DetailsEditCtrl.prototype.GetClone = function () {
      return this.CopyProfileService.GetProfileClone();
    };
    DetailsEditCtrl.prototype.Save = function (breederProfile) {
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
    return DetailsEditCtrl;
  }();  //# sourceMappingURL=DetailsEditCtrl.js.map
