/// <reference path="IndexCtrl.ts" />

interface IPuppiesScope extends IMainScope {
    puppies:PuppiesCtrl;
    ctrl:IndexCtrl;
}
class PuppiesCtrl {
    Litters:ILitter[];
    LittersNew:Litter[];

    constructor(public $scope:IPuppiesScope, litters:ILitter[], public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService, public CopyProfileService:CopyProfileService) {
        $scope.index.url = 'puppies';

        $scope.puppies = this;
        this.LittersNew = [];
        this.Litters = litters;
    }

    addNewLitter() {
        this.LittersNew.push(new Litter());
    }

    saveLitters() {
        var indexNew:number = 0;
        this.LittersNew.forEach((litter:ILitter) => {
            this.Litters.push(litter);
            this.LittersNew.splice(indexNew++, 1);
        });


        this.DataService.saveLitters(this.Litters).then(() => {
            this.ShowSuccess('You changes have been saved to Db');
        }, () => {

            this.ShowSuccess('You changes have not been saved to Db. Check please you connection.');
        });
    }

    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}