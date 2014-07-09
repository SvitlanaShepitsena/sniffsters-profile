var AboutCtrl = (function () {
    function AboutCtrl($scope, $state, toastr, DataService) {
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.home.IsSearchHidden = false;
        $scope.about = this;
    }
    AboutCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    AboutCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return AboutCtrl;
})();
