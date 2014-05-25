/// <reference path="IndexCtrl.ts" />
var PuppiesCtrl = (function () {
    function PuppiesCtrl($scope, $state, toastr, DataService, CopyProfileService) {
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        this.CopyProfileService = CopyProfileService;
        $scope.puppies = this;
        this.BreederProfile = CopyProfileService.GetProfileClone();
    }
    PuppiesCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    PuppiesCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return PuppiesCtrl;
})();
//# sourceMappingURL=PuppiesCtrl.js.map
