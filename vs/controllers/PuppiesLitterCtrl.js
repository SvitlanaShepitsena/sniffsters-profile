var PuppiesLitterCtrl = function () {
    function PuppiesLitterCtrl($scope, $state, toastr, DataService, CopyProfileService) {
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        this.CopyProfileService = CopyProfileService;
        $scope.puppiesLitter = this;
    }

    PuppiesLitterCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };
    PuppiesLitterCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return PuppiesLitterCtrl;
}();