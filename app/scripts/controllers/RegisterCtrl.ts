/// <reference path="HomeCtrl.ts" />
/// <reference path="../services/FinduserService.ts" />

class RegisterCtrl {
    email:string;
    pass:string;
    confpass:string;
    isBreeder:boolean;

    constructor(public $scope, $modal, settings, public $firebase, $filter, public $state:ng.ui.IStateService, public toastr:Toastr, public FinduserService:FinduserService) {
        $scope.register = this;
        $scope.home.IsSearchHidden = false;

        this.isBreeder = false;

//        $scope.email = "user_" + Math.random().toString(36).substring(13) + "@gmail.com";
//        $scope.pass = "123456";
//        $scope.confpass = "123456";


    }

    ShowSuccess(note:string) {
        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }
}