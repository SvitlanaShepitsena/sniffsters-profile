/// <reference path="../app.ts" />

interface IAbouteditScope extends ng.IScope {
    aboutedit:AbouteditCtrl;
    BreederProfile: IBreederProfile;
}
class AbouteditCtrl {
    static $inject = ['$scope', 'DataService', 'toastr'];

    constructor($scope:IAbouteditScope , public DataService:DataService, public toastr) {
        $scope.aboutedit = this;
    }
}