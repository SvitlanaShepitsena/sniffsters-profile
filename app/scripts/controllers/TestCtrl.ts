/// <reference path="../../bower_components/dt-angular/angular.d.ts" />
/// <reference path="../../bower_components/dt-toastr/toastr.d.ts" />
/// <reference path="../app.ts" />

interface ITestScope extends ng.IScope {
    test:TestCtrl;
    UserProfile: IUserProfile;
}
class TestCtrl {
    static $inject = ['$scope', 'DataService', 'toastr'];

    constructor($scope:ITestScope , public DataService:DataService, public toastr) {
        $scope.test = this;
    }


}
