/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../model/interfaces.d.ts" />
/// <reference path="../services/dbservice.ts" />
/// <reference path="../../../typings/toastr/toastr.d.ts" />
var ProfileCtrl = (function () {
    function ProfileCtrl($scope, dbService, toastr) {
        var _this = this;
        this.$scope = $scope;
        this.dbService = dbService;
        this.toastr = toastr;
        this.error = false;
        $scope.vm = this;
        var result = this.dbService.getProfileData('/BreederPersonal/GetProfile');

        this.breeder = result.get(function () {
            _this.breeder = _this.breeder;
            _this.error = false;
        }, function () {
            _this.showError('Error in DB request');
            _this.error = true;
        });
    }
    ProfileCtrl.prototype.showError = function (error) {
        this.toastr.error(error);
    };
    ProfileCtrl.$injector = ['$scope', 'dbService', 'toastr'];
    return ProfileCtrl;
})();
//# sourceMappingURL=profilectrl.js.map
