/// <reference path="../../bower_components/dt-angular/angular.d.ts" />
/// <reference path="../app.ts" />
/// <reference path="../../bower_components/dt-toastr/toastr.d.ts" />
/// <reference path="../models/IUserProfile.ts" />
var IndexCtrl = (function () {
    function IndexCtrl($scope, DataService, toastr) {
        var _this = this;
        this.DataService = DataService;
        this.toastr = toastr;
        $scope.index = this;

        var promiseT = this.DataService.getProfile();

        promiseT.then(function (userProfile) {
            //Success
            _this.error = false;
            _this.UserProfile = userProfile;
        }, function () {
            //Error
            _this.error = true;
            _this.ShowError("Error in Db Connection");
        });
    }
    IndexCtrl.prototype.ShowError = function (errorMessage) {
        this.toastr.error(errorMessage);
    };
    IndexCtrl.$inject = ['$scope', 'DataService', 'toastr'];
    return IndexCtrl;
})();
//# sourceMappingURL=IndexCtrl.js.map
