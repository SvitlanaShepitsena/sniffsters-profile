/// <reference path="HomeCtrl.ts" />
/// <reference path="../services/FinduserService.ts" />
var RegisterCtrl = (function () {
    function RegisterCtrl($scope, $modal, settings, $firebase, $filter, $state, toastr, FinduserService) {
        this.$scope = $scope;
        this.$firebase = $firebase;
        this.$state = $state;
        this.toastr = toastr;
        this.FinduserService = FinduserService;
        $scope.register = this;
        $scope.home.IsSearchHidden = false;

        this.isBreeder = false;
        //        $scope.email = "user_" + Math.random().toString(36).substring(13) + "@gmail.com";
        //        $scope.pass = "123456";
        //        $scope.confpass = "123456";
    }
    RegisterCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    RegisterCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return RegisterCtrl;
})();
