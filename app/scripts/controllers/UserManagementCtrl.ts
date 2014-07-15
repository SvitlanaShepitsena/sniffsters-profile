/// <reference path="HomeCtrl.ts" />

interface IUserManagementScope extends IHomeScope {
    management:UserManagementCtrl;
    home:HomeCtrl;
}
class UserManagementCtrl {
    breeders:any;
    lookers:any;
    urlRef:string;

    constructor(public $scope:IUserManagementScope, public $firebase, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        this.urlRef = "https://torid-fire-6526.firebaseio.com/breeders";
        this.breeders = $firebase(new Firebase(this.urlRef));
        this.urlRef = "https://torid-fire-6526.firebaseio.com/lookers";
        this.lookers = $firebase(new Firebase(this.urlRef));

        $scope.management = this;
    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}