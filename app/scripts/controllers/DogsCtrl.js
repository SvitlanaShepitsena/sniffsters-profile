var DogsCtrl = (function () {
    function DogsCtrl($scope, $state, toastr, DataService) {
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.dogs = this;
        $scope.home.IsSearchHidden = false;
    }
    DogsCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    DogsCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return DogsCtrl;
})();
//# sourceMappingURL=DogsCtrl.js.map
