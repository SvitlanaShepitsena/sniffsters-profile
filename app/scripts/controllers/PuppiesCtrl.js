var PuppiesCtrl = (function () {
    function PuppiesCtrl($scope, litters, $state, toastr, DataService, CopyProfileService) {
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        this.CopyProfileService = CopyProfileService;
        $scope.index.url = 'puppies';

        $scope.puppies = this;
        this.LittersNew = [];
        this.Litters = litters;
    }
    PuppiesCtrl.prototype.addNewLitter = function () {
        this.LittersNew.push(new Litter());
    };

    PuppiesCtrl.prototype.saveLitters = function () {
        var _this = this;
        var indexNew = 0;
        this.LittersNew.forEach(function (litter) {
            _this.Litters.push(litter);
            _this.LittersNew.splice(indexNew++, 1);
        });

        this.DataService.saveLitters(this.Litters).then(function () {
            _this.ShowSuccess('You changes have been saved to Db');
        }, function () {
            _this.ShowSuccess('You changes have not been saved to Db. Check please you connection.');
        });
    };

    PuppiesCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    PuppiesCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return PuppiesCtrl;
})();
