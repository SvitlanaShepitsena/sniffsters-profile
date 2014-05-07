/// <reference path="../../bower_components/dt-angular/angular.d.ts" />
/// <reference path="../app.ts" />
/// <reference path="../../bower_components/dt-toastr/toastr.d.ts" />
/// <reference path="../models/IUserProfile.ts" />

interface IMainScope extends ng.IScope {
    index:IndexCtrl;
    UserProfile: IUserProfile;
}
class IndexCtrl {
    static $inject = ['$scope', 'DataService', 'toastr'];

    constructor($scope:IMainScope, public DataService:DataService, public toastr) {
        $scope.index = this;

        var promiseT = this.DataService.getProfile<IUserProfile>();

        promiseT.then((userProfile:IUserProfile) => {
            //Success
            this.error = false;
            this.UserProfile = userProfile;

        }, () => {
            //Error
            this.error = true;
            this.ShowError("Error in Db Connection")

        })
    }


    UserProfile:IUserProfile;


    error:boolean;

    ShowError(errorMessage:string) {
        this.toastr.error(errorMessage);
    }
}
