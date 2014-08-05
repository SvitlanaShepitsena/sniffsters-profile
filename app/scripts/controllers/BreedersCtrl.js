/// <reference path="HomeCtrl.ts" />
var BreedersCtrl = (function () {
    function BreedersCtrl($scope, $modal, $stateParams, $state, toastr, DataService) {
        this.$scope = $scope;
        this.$modal = $modal;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.modalContactSearch = {
            "title": "New Message",
            show: true
        };
        $scope.sortBy = [
            {
                name: 'Recent Litters',
                val: 'profile.LittersNumber'
            }
        ];
        $scope.sortFeature = {};

        $scope.home.IsSearchHidden = false;
        $scope.breedersCtrl = this;

        $scope.searchLocation = ($stateParams.location == null || $stateParams.location == "") ? null : $stateParams.location;
        $scope.searchBreed = ($stateParams.breed == null || $stateParams.breed == "") ? null : $stateParams.breed;

        $scope.breeders = [];

        DataService.getAllProfiles().then(function (breedersArr) {
            var breeders = _.values(breedersArr);
            breeders.forEach(function (breeder) {
                if (!_.isNull($scope.searchLocation)) {
                    if (_.isUndefined(breeder.profile) || _.isNull(breeder.profile.Location) || $scope.searchLocation != breeder.profile.Location) {
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
                $scope.breeders.push(breeder);
            });
        });
    }
    BreedersCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    BreedersCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return BreedersCtrl;
})();
