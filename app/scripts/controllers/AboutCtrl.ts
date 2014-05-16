/// <reference path="../app.ts" />

interface IAboutScope extends ng.IScope {
    about:AboutCtrl;
    BreederProfile: IBreederProfile;
}
class AboutCtrl {
    static $inject = ['$scope', 'DataService', 'toastr'];

    constructor($scope:IAboutScope , public DataService:DataService, public toastr) {
        $scope.about = this;
    }
}