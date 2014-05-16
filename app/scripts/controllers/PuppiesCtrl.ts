/// <reference path="../app.ts" />

interface IPuppiesScope extends ng.IScope {
    puppies:PuppiesCtrl;
    BreederProfile: IBreederProfile;
}
class PuppiesCtrl {
    static $inject = ['$scope', 'DataService', 'toastr'];

    constructor($scope:IPuppiesScope , public DataService:DataService, public toastr) {
        $scope.puppies = this;
    }
}