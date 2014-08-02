/// <reference path="HomeCtrl.ts" />

class BreedersCtrl {
    breeders:IBreederProfile[];

    constructor(public $scope, $stateParams, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.home.IsSearchHidden = false;
        $scope.breedersCtrl = this;

        $scope.searchLocation = ($stateParams.location == null || $stateParams.location == "") ? null : $stateParams.location;
        $scope.searchBreed = ($stateParams.breed == null || $stateParams.breed == "") ? null : $stateParams.breed;

        $scope.breeders = [];

        DataService.getAllProfiles().then((breedersArr:IBreederProfile[])=> {
            var breeders = _.values(breedersArr);
            breeders.forEach((breeder)=> {
                if (!_.isNull($scope.searchLocation)) {
                    if (_.isNull(breeder.profile.Location) || $scope.searchLocation != breeder.profile.Location) {
                        return;
                    }
                }
                if (!_.isNull($scope.searchBreed)) {
                    if ((_.isUndefined(breeder.profile.breeds)) || _.values(breeder.profile.breeds).indexOf($scope.searchBreed) == -1) {
                        console.log(breeder);
                        return;
                    }
                }
                $scope.breeders.push(breeder)
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