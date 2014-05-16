/// <reference path="../app.ts" />

interface IPhotosScope extends ng.IScope {
    photos:PhotosCtrl;
    BreederProfile: IBreederProfile;
}
class PhotosCtrl {
    static $inject = ['$scope', 'DataService', 'toastr'];

    constructor($scope:IPhotosScope , public DataService:DataService, public toastr) {
        $scope.photos = this;
    }
}