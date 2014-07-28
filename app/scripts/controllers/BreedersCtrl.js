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

        /*
         Todo: apply MainUrl
         @author - Svitlana
         @date - 7/27/2014
         @time - 9:27 PM
         */
        var fref = new Firebase("https://torid-fire-6526.firebaseio.com/");
        new FirebaseSimpleLogin(fref, function () {
            DataService.getAllProfiles().then(function (breedersArr) {
                _this.breeders = _.values(breedersArr);
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
