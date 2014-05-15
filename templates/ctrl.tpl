/// <reference path="../app.ts" />

interface I#name#Scope extends ng.IScope {
    #lname#:#name#Ctrl;
    BreederProfile: IBreederProfile;
}
class #name#Ctrl {
    static $inject = ['$scope', 'DataService', 'toastr'];

    constructor($scope:I#name#Scope , public DataService:DataService, public toastr) {
        $scope.#lname# = this;
    }
}