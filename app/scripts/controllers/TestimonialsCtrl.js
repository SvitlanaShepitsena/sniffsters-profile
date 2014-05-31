var TestimonialsCtrl = (function () {
    function TestimonialsCtrl($scope, $state, toastr, DataService, CopyProfileService) {
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        this.CopyProfileService = CopyProfileService;
        $scope.testimonials = this;
        this.BreederProfile = CopyProfileService.GetProfileClone();
    }
    TestimonialsCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    TestimonialsCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return TestimonialsCtrl;
})();
