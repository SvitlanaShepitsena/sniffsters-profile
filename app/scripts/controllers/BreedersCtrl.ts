/// <reference path="HomeCtrl.ts" />

interface IBreedersScope extends IMainScope {
    breedersCtrl:BreedersCtrl;
    ctrl:IndexCtrl;
    home:HomeCtrl;
}
class BreedersCtrl {
    breeders:IBreederProfile[];

    constructor(public $scope:IBreedersScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.home.IsSearchHidden = false;
        $scope.breedersCtrl = this;


        DataService.getAllProfiles().then((breedersArr:IBreederProfile[])=> {

            this.breeders = _.values(breedersArr);

        });
    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}