/// <reference path="../../bower_components/dt-angular/angular.d.ts" />
/// <reference path="../../bower_components/dt-toastr/toastr.d.ts" />
/// <reference path="../app.ts" />
var TestCtrl = (function () {
    function TestCtrl($scope, DataService, toastr) {
        this.DataService = DataService;
        this.toastr = toastr;
        $scope.test = this;
    }
    TestCtrl.$inject = ['$scope', 'DataService', 'toastr'];
    return TestCtrl;
})();
//# sourceMappingURL=TestCtrl.js.map
