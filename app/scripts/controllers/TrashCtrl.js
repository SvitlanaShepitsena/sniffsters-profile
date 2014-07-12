/// <reference path="HomeCtrl.ts" />
var TrashCtrl = (function () {
    function TrashCtrl($scope, $state, toastr, DataService) {
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.trash = this;
    }
    TrashCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    TrashCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return TrashCtrl;
})();
