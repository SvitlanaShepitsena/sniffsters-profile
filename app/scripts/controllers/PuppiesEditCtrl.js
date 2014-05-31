var PuppiesEditCtrl = (function () {
    function PuppiesEditCtrl($scope, $state, toastr, DataService, CopyProfileService) {
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        this.CopyProfileService = CopyProfileService;
        $scope.puppiesEdit = this;
        this.BreederProfileEdit = CopyProfileService.GetProfileClone();
    }
    PuppiesEditCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    PuppiesEditCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return PuppiesEditCtrl;
})();
