/// <reference path="IndexCtrl.ts" />
var PhotosEditCtrl = (function () {
    function PhotosEditCtrl($scope, $state, toastr, DataService, CopyProfileService) {
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        this.CopyProfileService = CopyProfileService;
        $scope.photosEdit = this;

        this.BreederProfileEdit = CopyProfileService.GetProfileClone();
    }
    PhotosEditCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    PhotosEditCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return PhotosEditCtrl;
})();
//# sourceMappingURL=PhotosEditCtrl.js.map
