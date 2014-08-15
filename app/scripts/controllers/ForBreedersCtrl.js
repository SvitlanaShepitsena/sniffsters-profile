/// <reference path="HomeCtrl.ts" />
var ForBreedersCtrl = (function () {
    function ForBreedersCtrl($scope, $stateParams, $state, toastr, DataService, $location, $anchorScroll) {
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.forBreeders = this;
        $scope.home.IsSearchHidden = false;
        $scope.home.IsHome = false;

        if ($stateParams.scroll) {
            $location.hash('upgrade');
            $anchorScroll();
        }
    }
    ForBreedersCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    ForBreedersCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return ForBreedersCtrl;
})();
