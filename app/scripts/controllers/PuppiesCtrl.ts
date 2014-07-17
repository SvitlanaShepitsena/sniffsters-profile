/// <reference path="HomeCtrl.ts" />

interface IPuppiesScope extends IMainScope {
    puppies:PuppiesCtrl;
    ctrl:IndexCtrl;
}
class PuppiesCtrl {
    Litters:ILitter[];
    LittersNew:ILitter[];

    SelectedLitter:ILitter;
    SelectedLitterEdit:ILitter;

    constructor(public $scope, public $firebase, public $modal, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService, public CopyProfileService:CopyProfileService) {

        this.$scope.home.auth.$getCurrentUser().then((user) => {
            this.$scope.home.Breedership(this.$scope.home.FireProcess(user.email)).then(() => {
                var litterUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.FireProcess(user.email) + '/litters';
                $scope.litters = $firebase(new Firebase(litterUrl));
            })
        })
        this.LittersNew = [];
        $scope.home.url = 'puppies';
        $scope.puppies = this;

        $scope.isOk = false;
        /*        DataService.getLitters($scope.index.IdFire).then((litters:ILitter[])=> {
         this.Litters = litters;
         })*/

        $scope.$watch("puppies.LittersNew", () => {
            for (var i = 0; i < this.LittersNew.length; i++) {
                var litter:ILitter = this.LittersNew[i];
                if (!(
                    typeof(litter.Title) != 'undefined' && litter.Title.length < 250
                    && typeof(litter.Puppies) != 'undefined' && litter.Puppies.length < 250
                    && typeof(litter.DateOfBirth) != 'undefined'
                    && typeof(litter.Colors) != 'undefined' && litter.Colors.length < 250

                    )) {
                    this.$scope.isOk = true;
//                console.log($scope.isOk);
                    break;
                } else {
                    this.$scope.isOk = false;
                }
            }
        }, true);
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