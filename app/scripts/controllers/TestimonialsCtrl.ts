/// <reference path="../app.ts" />

interface ITestimonialsScope extends ng.IScope {
    testimonials:TestimonialsCtrl;
    BreederProfile: IBreederProfile;
}
class TestimonialsCtrl {
    static $inject = ['$scope', 'DataService', 'toastr'];

    constructor($scope:ITestimonialsScope , public DataService:DataService, public toastr) {
        $scope.testimonials = this;
    }
}