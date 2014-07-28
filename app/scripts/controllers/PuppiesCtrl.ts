/// <reference path="HomeCtrl.ts" />

interface IPuppiesScope extends IMainScope {
    puppies:PuppiesCtrl;
    home:HomeCtrl;
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
        this.LittersNew.forEach((litter:ILitter, index) => {
            var litterShort = _.omit(litter, 'Photos');
            this.$scope.litters.$add(litterShort).then((key) => {
                litter.Photos.forEach((photo)=> {
                    this.$scope.litters.$child(key.name()).$child('Photos').$add(_.omit(photo, 'isSized'));
                })
                this.LittersNew.splice(index, 1);
            });
        });
    }

    cancelLitters() {
        this.LittersNew = [];
    }


    ShowSuccess(note:string) {
        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }
}