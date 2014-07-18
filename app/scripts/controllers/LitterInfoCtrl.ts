/// <reference path="HomeCtrl.ts" />

interface ILitterInfoScope extends IHomeScope {
    litterInfo:LitterInfoCtrl;
    home:HomeCtrl;

}
class LitterInfoCtrl {

    constructor(public $scope, public $modal, public $stateParams, public $firebase, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.litterInfo = this;

        var litterId = $stateParams.id;
        $scope.home.auth.$getCurrentUser().then((user) => {
            $scope.home.Breedership($scope.home.FireProcess(user.email)).then(() => {
                var litterUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.FireProcess(user.email) + '/litters/' + litterId;
//                console.log(litterUrl);
                $scope.litter = $firebase(new Firebase(litterUrl));
            })
        })
    }

    saveLitter() {
        var colors = this.$scope.litter.Colors;
        var date = this.$scope.litter.DateOfBirth;
        var title = this.$scope.litter.Title;
        var puppies = this.$scope.litter.Puppies;

        this.$scope.litter.$update({
            Colors: colors,
            DateOfBirth: date,
            Title: title,
            Puppies: puppies
        }).then(() => {
            this.ShowSuccess('Data has been saved to Db');
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
                this.$scope.litter.$remove();
                this.$state.go('^');
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