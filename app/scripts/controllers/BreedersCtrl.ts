/// <reference path="HomeCtrl.ts" />

class BreedersCtrl {
    breeders:IBreederProfile[];

    constructor(public $scope, public $modal, $stateParams, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {

        $scope.modalContactSearch = {
            "title": "New Message",
            show: true
        };
        $scope.sortBy = [
            {
                name: 'Recent Litters',
                val: 'profile.LittersNumber'
            }
        ]
        $scope.sortFeature = {};

        $scope.home.IsSearchHidden = false;
        $scope.breedersCtrl = this;

        $scope.searchLocation = ($stateParams.location == null || $stateParams.location == "") ? null : $stateParams.location;
        $scope.searchBreed = ($stateParams.breed == null || $stateParams.breed == "") ? null : $stateParams.breed;

        $scope.breeders = [];

        DataService.getAllProfiles().then((breedersArr:IBreederProfile[])=> {
            var breeders = _.values(breedersArr);
            breeders.forEach((breeder)=> {
                if (!breeder.profile.isAdmin) {

                    if (!_.isNull($scope.searchLocation)) {

                        if (_.isUndefined(breeder.profile) || _.isNull(breeder.profile.Location) || breeder.profile.Location.indexOf($scope.searchLocation) == -1) {
                            return;
                        }
                    }
                    if (!_.isNull($scope.searchBreed)) {
                        if ((_.isUndefined(breeder.profile.breeds)) || _.values(breeder.profile.breeds).indexOf($scope.searchBreed) == -1) {
                            console.log(breeder);
                            return;
                        }
                    }

                    breeder.LittersNumber = breeder.hasOwnProperty('litters') ? _.values(breeder.litters).length : 0;
                    $scope.breeders.push(breeder)
                }
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