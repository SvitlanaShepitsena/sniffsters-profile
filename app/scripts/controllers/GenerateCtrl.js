var GenerateCtrl = (function () {
    function GenerateCtrl($scope, $firebase, $state, toastr, DataService) {
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.generate = this;
    }
    GenerateCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    GenerateCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return GenerateCtrl;
})();
