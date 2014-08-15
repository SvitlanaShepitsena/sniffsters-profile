/// <reference path="HomeCtrl.ts" />

interface IForBreedersScope extends IMainScope {
    forBreeders:ForBreedersCtrl;
    home:HomeCtrl;
}
class ForBreedersCtrl {

    constructor(public $scope:IForBreedersScope, $stateParams, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService, $location, $anchorScroll) {
        $scope.forBreeders = this;
        $scope.home.IsSearchHidden = false;
        $scope.home.IsHome = false;


        if ($stateParams.scroll) {
            $location.hash('upgrade');
            $anchorScroll();
        }
    }

    ShowSuccess(note:string) {
        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }
}