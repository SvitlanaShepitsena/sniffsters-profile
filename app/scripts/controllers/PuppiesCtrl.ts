/// <reference path="IndexCtrl.ts" />

interface IPuppiesScope extends IMainScope {
    puppies:PuppiesCtrl;
    ctrl:IndexCtrl;
}
class PuppiesCtrl {
    Litters:ILitter[];
    LittersNew:Litter[];

    SelectedLitter:ILitter;
    SelectedLitterEdit:ILitter;

    constructor(public $scope:IPuppiesScope, public $modal, litters:ILitter[], public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService, public CopyProfileService:CopyProfileService) {
        $scope.index.url = 'puppies';

        $scope.puppies = this;
        this.LittersNew = [];
        this.Litters = litters;
    }

    setSelectedLitter(litterId:number) {
        var litid:number = 0;
        var index:number = 0;

        this.Litters.forEach((litter:ILitter) => {

            if (litter.Id === litterId) {
                litid = index;
                return false;
            }
            index++;
        });
        this.SelectedLitter = this.Litters[litid];
        this.$state.go('profile.puppies3.litter', {'id': litid});
//        console.log("Hello");
    }

    addNewLitter() {
        this.LittersNew.unshift(new Litter());
    }

    saveNewLitters() {
        var indexNew:number = 0;
        this.LittersNew.forEach((litter:ILitter) => {
            this.Litters.push(litter);
            this.LittersNew.splice(indexNew++, 1);
        });

    }

    deleteLitter() {


        var modalInstance = this.$modal.open({
            template: "<div><div class=\"modal-body\">Delete this Litter?</div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-click=\"ok()\">OK</button><button class=\"btn btn-warning\" ng-click=\"cancel()\">Cancel</button></div></div>",
            size: 'sm',
            controller: ($scope, $modalInstance) => {
                $scope.ok = () => {
                    $modalInstance.close(true)
                }

                $scope.cancel = () => {
                    $modalInstance.close(false)
                }
            }

        });

        modalInstance.result.then((confirmation:boolean) => {
            if (confirmation) {

                this.DataService.deleteLitter(this.SelectedLitter.Id).then(() => {
                    var index:number = 0;
                    this.Litters.forEach((litter:ILitter) => {
                        if (litter.Id === this.SelectedLitter.Id) {
                            this.Litters.splice(index, 1);
                            return false;
                        }
                        index++;
                    })
                    this.$state.go('^');
                })
            }
        })
    }

    ShowSuccess(note:string) {
        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }
}