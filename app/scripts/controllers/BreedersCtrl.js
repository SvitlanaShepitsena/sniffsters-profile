var BreedersCtrl = (function () {
    function BreedersCtrl($scope, $state, toastr, DataService) {
        var _this = this;
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.home.IsSearchHidden = false;
        $scope.breedersCtrl = this;

        DataService.getAllProfiles().then(function (breedersArr) {
            _this.breeders = _.values(breedersArr);
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
