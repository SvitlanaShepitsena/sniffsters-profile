/// <reference path="../../bower_components/dt-angular/angular.d.ts" />
/// <reference path="../../bower_components/dt-toastr/toastr.d.ts" />
/// <reference path="../app.ts" />

interface I#name#Scope extends ng.IScope {
    #lname#:#name#Ctrl;
    UserProfile: IUserProfile;
}
class #name#Ctrl {
    static $inject = ['$scope', 'DataService', 'toastr'];

    constructor($scope:I#name#Scope , public DataService:DataService, public toastr) {
        $scope.#lname# = this;
    }


}
