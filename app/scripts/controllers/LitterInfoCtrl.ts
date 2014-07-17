/// <reference path="HomeCtrl.ts" />

interface ILitterInfoScope extends IHomeScope {
    litterInfo:LitterInfoCtrl;
    home:HomeCtrl;

}
class LitterInfoCtrl {

    constructor(public $scope, public $stateParams, public $firebase, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
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

    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}