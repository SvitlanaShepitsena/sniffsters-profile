/// <reference path="../app.ts" />

interface IDetailsScope extends ng.IScope {
    details:DetailsCtrl;
    BreederProfile: IBreederProfile;
}
class DetailsCtrl {
    static $inject = ['$scope', 'DataService', 'toastr'];

    constructor($scope:IDetailsScope , public DataService:DataService, public toastr) {
        $scope.details = this;
    }
}