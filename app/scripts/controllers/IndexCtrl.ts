/// <reference path="../../bower_components/dt-angular/angular.d.ts" />
/// <reference path="../app.ts" />
/// <reference path="../../bower_components/dt-toastr/toastr.d.ts" />
/// <reference path="../models/IBreederProfile.ts" />

interface IMainScope extends ng.IScope {
    index:IndexCtrl;
    UserProfile: IBreederProfile;
}
class IndexCtrl {
    static $inject = ['$scope', 'DataService', 'toastr'];

    constructor($scope:IMainScope, public DataService:DataService, public toastr) {
        $scope.index = this;

        var promiseT = this.DataService.getProfile<IBreederProfile>();

        promiseT.then((breederProfile:IBreederProfile) => {
            //Success
            this.error = false;
            this.BreederProfile= breederProfile;

        }, () => {
            //Error
            this.error = true;
            this.ShowError("Error in Db Connection")

        })
    }


    BreederProfile:IBreederProfile;
text:string = 'Text Outer Scope';

    error:boolean;

    ShowError(errorMessage:string) {
        this.toastr.error(errorMessage);
    }
}
