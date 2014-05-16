/// <reference path="../app.ts" />
var TestimonialsCtrl = (function () {
    function TestimonialsCtrl($scope, DataService, toastr) {
        this.DataService = DataService;
        this.toastr = toastr;
        $scope.testimonials = this;
    }
    TestimonialsCtrl.$inject = ['$scope', 'DataService', 'toastr'];
    return TestimonialsCtrl;
})();
//# sourceMappingURL=TestimonialsCtrl.js.map
