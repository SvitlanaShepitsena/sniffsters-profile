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

    constructor(public $scope, public $firebase, public $stateParams, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.home.IsSearchHidden = false;
        $scope.lookerCtrl = this;

        var lookerEmail = this.$stateParams.uname;
        var lookerUrl = $scope.home.MainUrl + 'lookers/' + $scope.home.FireProcess(lookerEmail);
        $scope.looker = $firebase(new Firebase(lookerUrl));
        $scope.save = () => {
            $scope.looker.$save();
        }
    }

    ShowSuccess(note:string) {
        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

    ResetAllFields = () => {
        this.$scope.looker = "";
    }
}