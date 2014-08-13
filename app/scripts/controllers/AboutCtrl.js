/// <reference path="HomeCtrl.ts" />
var AboutCtrl = (function () {
    function AboutCtrl($scope, FinduserService, $state, toastr, DataService) {
        this.$scope = $scope;
        this.FinduserService = FinduserService;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.home.IsSearchHidden = false;
        $scope.home.IsHome = false;
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
