/// <reference path="HomeCtrl.ts" />

interface ILitterInfoScope extends IHomeScope {
    litterInfo:LitterInfoCtrl;
    home:HomeCtrl;

}
class LitterInfoCtrl {

    constructor(public $scope, public $modal, public $stateParams, public $firebase, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.litterInfo = this;
        $scope.files = [];
        var litterId = $stateParams.id;
        $scope.home.auth.$getCurrentUser().then((user) => {
            $scope.home.Breedership($scope.home.FireProcess(user.email)).then(() => {
                var litterUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.FireProcess(user.email) + '/litters/' + litterId;
                $scope.l = $firebase(new Firebase(litterUrl));
            })
        })


        $scope.saveLitter = () => {

            var photos = $scope.l.$child('Photos');

            $scope.files.forEach((photo, index)=> {
                photos.$add(photo);
            })

            $scope.l.$save().then(() => {
                $state.go('^');
            })


        }
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