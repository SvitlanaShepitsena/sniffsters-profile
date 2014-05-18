/// <reference path="../app.ts" />
var AboutCtrl = (function () {
    function AboutCtrl($scope, DataService, toastr, CopyProfileService) {
        this.DataService = DataService;
        this.toastr = toastr;
        this.CopyProfileService = CopyProfileService;
        $scope.about = this;
        this.BreederProfile = CopyProfileService.BreederProfile;
    }
    return AboutCtrl;
})();
//# sourceMappingURL=AboutCtrl.js.map
