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

        var fref = new Firebase("https://torid-fire-6526.firebaseio.com/");
        new FirebaseSimpleLogin(fref, function () {
            DataService.getAllProfiles().then(function (breedersArr) {
                _this.breeders = _.values(breedersArr);
            });
        });
    }
    BreedersCtrl.prototype.followUser = function (loggedUser, follower) {
        var _this = this;
        this.DataService.followUser(loggedUser, follower).then(function () {
            _this.$scope.home.AddToFollowers(follower);
        });
    };
    BreedersCtrl.prototype.unFollowUser = function (loggedUser, follower) {
        var _this = this;
        this.DataService.unFollowUser(loggedUser, follower).then(function () {
            _this.$scope.home.RemoveFromFollowers(follower);
        });
    };
    BreedersCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    BreedersCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return BreedersCtrl;
})();
