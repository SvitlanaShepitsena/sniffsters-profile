/// <reference path="HomeCtrl.ts" />
var AdvertiseCtrl = (function () {
    function AdvertiseCtrl($scope, $state, toastr, DataService) {
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.advertise = this;
        $scope.home.IsSearchHidden = false;
    }
    AdvertiseCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    AdvertiseCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return AdvertiseCtrl;
})();
