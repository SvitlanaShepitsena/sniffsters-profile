var TestimonialsCtrl = (function () {
    function TestimonialsCtrl($scope, $state, toastr, DataService, CopyProfileService) {
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        this.CopyProfileService = CopyProfileService;
        $scope.testimonials = this;
    }

    TestimonialsCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    TestimonialsCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return TestimonialsCtrl;
})();
