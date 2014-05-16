/// <reference path="../app.ts" />
var DetailsCtrl = (function () {
    function DetailsCtrl($scope, DataService, toastr) {
        this.DataService = DataService;
        this.toastr = toastr;
        $scope.details = this;
    }
    DetailsCtrl.$inject = ['$scope', 'DataService', 'toastr'];
    return DetailsCtrl;
})();
//# sourceMappingURL=DetailsCtrl.js.map
