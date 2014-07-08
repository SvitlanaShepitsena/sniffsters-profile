/// <reference path="IndexCtrl.ts" />
var RegisterCtrl = (function () {
    function RegisterCtrl($scope, $state, toastr, DataService) {
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.register = this;
        $scope.home.IsSearchHidden = false;
    }
    RegisterCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    RegisterCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return RegisterCtrl;
})();
