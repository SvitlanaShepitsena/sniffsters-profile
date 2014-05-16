/// <reference path="../app.ts" />
var AboutCtrl = (function () {
    function AboutCtrl($scope, DataService, toastr) {
        this.DataService = DataService;
        this.toastr = toastr;
        $scope.about = this;
    }
    AboutCtrl.$inject = ['$scope', 'DataService', 'toastr'];
    return AboutCtrl;
})();
//# sourceMappingURL=AboutCtrl.js.map
