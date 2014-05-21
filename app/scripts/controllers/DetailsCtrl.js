/// <reference path="IndexCtrl.ts" />
var DetailsCtrl = (function () {
    function DetailsCtrl($scope, $state, toastr, DataService, CopyProfileService) {
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        this.CopyProfileService = CopyProfileService;
        $scope.details = this;

        this.BreederProfile = CopyProfileService.GetProfileClone();
    }
    DetailsCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    DetailsCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return DetailsCtrl;
})();
//# sourceMappingURL=DetailsCtrl.js.map
