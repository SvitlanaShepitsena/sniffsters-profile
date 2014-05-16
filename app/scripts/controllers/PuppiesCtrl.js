/// <reference path="../app.ts" />
var PuppiesCtrl = (function () {
    function PuppiesCtrl($scope, DataService, toastr) {
        this.DataService = DataService;
        this.toastr = toastr;
        $scope.puppies = this;
    }
    PuppiesCtrl.$inject = ['$scope', 'DataService', 'toastr'];
    return PuppiesCtrl;
})();
//# sourceMappingURL=PuppiesCtrl.js.map
