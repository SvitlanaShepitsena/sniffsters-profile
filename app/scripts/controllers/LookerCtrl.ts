/// <reference path="HomeCtrl.ts" />
/// <reference path="MessagesCtrl.ts" />

interface ILookerScope extends IHomeScope {
    lookerCtrl:LookerCtrl;
    looker:any
    home:HomeCtrl;
    messages:MessagesCtrl;
    ResetAllFields: () => void;
}
class LookerCtrl {
    lookersUrl:string;

    constructor(public $scope:ILookerScope, public $firebase, public $stateParams, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.home.IsSearchHidden = false;
        $scope.lookerCtrl = this;

        /*
         Todo: apply MainUrl
         @author - Svitlana
         @date - 7/27/2014
         @time - 9:27 PM
         */
//        this.lookersUrl = "https://torid-fire-6526.firebaseio.com/lookers/";

        var lookerEmail = this.$stateParams.uname;
//        var lookerUrl = this.lookersUrl + $scope.home.FireProcess(lookerEmail);
        var lookerUrl = $scope.home.MainUrl + 'lookers/' + $scope.home.FireProcess(lookerEmail);
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
        this.$scope.looker = "";
    }

}