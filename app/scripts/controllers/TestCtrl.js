/// <reference path="IndexCtrl.ts" />
var TestCtrl = (function () {
    function TestCtrl($scope, $state, toastr, DataService, CopyProfileService) {
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        this.CopyProfileService = CopyProfileService;
        $scope.test = this;
    }
    TestCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    TestCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return TestCtrl;
})();
//# sourceMappingURL=TestCtrl.js.map
