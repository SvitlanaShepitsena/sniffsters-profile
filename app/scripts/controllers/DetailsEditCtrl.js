/// <reference path="IndexCtrl.ts" />
var DetailsEditCtrl = (function () {
    function DetailsEditCtrl($scope, $state, toastr, DataService, CopyProfileService) {
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        this.CopyProfileService = CopyProfileService;
        $scope.DetailsEdit = this;
    }
    DetailsEditCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    DetailsEditCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return DetailsEditCtrl;
})();
//# sourceMappingURL=DetailsEditCtrl.js.map
