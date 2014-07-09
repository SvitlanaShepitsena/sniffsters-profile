var ContactCtrl = (function () {
    function ContactCtrl($scope, $state, toastr, DataService) {
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.contact = this;
        $scope.home.IsSearchHidden = false;
    }
    ContactCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    ContactCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return ContactCtrl;
})();
