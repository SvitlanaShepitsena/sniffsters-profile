var HomeCtrl = (function () {
    function HomeCtrl($scope, $firebase, $firebaseSimpleLogin, $state, toastr, DataService) {
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.home = this;
        var fref = new Firebase("https://torid-fire-6526.firebaseio.com/");
        $scope.auth = $firebaseSimpleLogin(fref);

        console.log($scope.auth);
        this.IsSearchHidden = true;
    }
    HomeCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    HomeCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return HomeCtrl;
})();
