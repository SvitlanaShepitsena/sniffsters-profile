/// <reference path="../app.ts" />
var PhotosCtrl = (function () {
    function PhotosCtrl($scope, DataService, toastr) {
        this.DataService = DataService;
        this.toastr = toastr;
        $scope.photos = this;
    }
    PhotosCtrl.$inject = ['$scope', 'DataService', 'toastr'];
    return PhotosCtrl;
})();
//# sourceMappingURL=PhotosCtrl.js.map
