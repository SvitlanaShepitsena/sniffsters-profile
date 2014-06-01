var TestimonialsEditCtrl = (function () {
    function TestimonialsEditCtrl($scope, $state, toastr, DataService, CopyProfileService) {
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        this.CopyProfileService = CopyProfileService;
        $scope.testimonialsEdit = this;

        this.BreederProfileEdit = CopyProfileService.GetProfileClone();
    }
    TestimonialsEditCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    TestimonialsEditCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return TestimonialsEditCtrl;
})();
