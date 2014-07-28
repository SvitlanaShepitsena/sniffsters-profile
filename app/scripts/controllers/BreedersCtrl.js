/// <reference path="HomeCtrl.ts" />
var BreedersCtrl = (function () {
    function BreedersCtrl($scope, $state, toastr, DataService) {
        var _this = this;
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.home.IsSearchHidden = false;
        $scope.breedersCtrl = this;

        this.$scope.home.auth.$getCurrentUser().then(function (user) {
            _this.$scope.home.Breedership(_this.$scope.home.FireProcess(user.email)).then(function () {
                DataService.getAllProfiles().then(function (breedersArr) {
                    _this.breeders = _.values(breedersArr);
                });
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
