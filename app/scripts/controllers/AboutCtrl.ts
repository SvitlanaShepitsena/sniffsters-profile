/// <reference path="../app.ts" />

interface IAboutScope extends ng.IScope {
    about:AboutCtrl;
}
class AboutCtrl {

    constructor($scope:IAboutScope , public DataService:DataService, public toastr,public CopyProfileService:CopyProfileService) {
        $scope.about = this;
        this.BreederProfile = CopyProfileService.BreederProfile;
    }
    BreederProfile:IBreederProfile;
}