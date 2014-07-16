/// <reference path="HomeCtrl.ts" />
/// <reference path="MessagesCtrl.ts" />

interface ILookerScope extends IHomeScope {
    lookerCtrl:LookerCtrl;
    looker:any
    home:HomeCtrl;
    messages:MessagesCtrl;
}
class LookerCtrl {
    lookersUrl:string;

    constructor(public $scope:ILookerScope, public $firebase, public $stateParams, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.lookerCtrl = this;
        this.lookersUrl = "https://torid-fire-6526.firebaseio.com/lookers/";

        var lookerEmail = this.$stateParams.uname;
        var lookerUrl = this.lookersUrl + $scope.home.FireProcess(lookerEmail);
        $scope.looker = $firebase(new Firebase(lookerUrl));
    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

    Save = () => {

    }

    ResetAllFields = () => {

    }

}