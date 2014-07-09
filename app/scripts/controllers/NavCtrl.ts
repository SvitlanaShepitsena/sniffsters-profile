/// <reference path="HomeCtrl.ts" />

class NavCtrl {

    constructor(public $scope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.nav = this;

        $scope
    }


}