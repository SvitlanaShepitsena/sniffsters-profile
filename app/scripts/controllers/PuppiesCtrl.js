/// <reference path="HomeCtrl.ts" />
var PuppiesCtrl = (function () {
    function PuppiesCtrl($scope, $firebase, $modal, $state, toastr, DataService, CopyProfileService) {
        var _this = this;
        this.$scope = $scope;
        this.$firebase = $firebase;
        this.$modal = $modal;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        this.CopyProfileService = CopyProfileService;
        this.$scope.home.auth.$getCurrentUser().then(function (user) {
            _this.$scope.home.Breedership(_this.$scope.home.FireProcess(user.email)).then(function () {
                var litterUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.FireProcess(user.email) + '/litters';
                $scope.litters = $firebase(new Firebase(litterUrl));
            });
        });
        this.LittersNew = [];
        $scope.home.url = 'puppies';
        $scope.puppies = this;

        $scope.isOk = false;

        /*        DataService.getLitters($scope.index.IdFire).then((litters:ILitter[])=> {
         this.Litters = litters;
         })*/
        $scope.$watch("puppies.LittersNew", function () {
            for (var i = 0; i < _this.LittersNew.length; i++) {
                var litter = _this.LittersNew[i];
                if (!(typeof (litter.Title) != 'undefined' && litter.Title.length < 250 && typeof (litter.Puppies) != 'undefined' && litter.Puppies.length < 250 && typeof (litter.DateOfBirth) != 'undefined' && typeof (litter.Colors) != 'undefined' && litter.Colors.length < 250)) {
                    _this.$scope.isOk = true;

                    break;
                } else {
                    _this.$scope.isOk = false;
                }
            }
        }, true);
    }

    PuppiesCtrl.prototype.addNewLitter = function () {
        this.LittersNew.unshift(new Litter());
    };

    PuppiesCtrl.prototype.saveNewLitters = function () {
        var _this = this;
        var indexNew = 0;
        this.LittersNew.forEach(function (litter) {
            _this.Litters.push(litter);
            _this.LittersNew.splice(indexNew++, 1);
        });
    };

    PuppiesCtrl.prototype.deleteLitter = function () {
        var modalInstance = this.$modal.open({
            template: "<div><div class=\"modal-body\">Delete this Litter?</div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-click=\"ok()\">OK</button><button class=\"btn btn-warning\" ng-click=\"cancel()\">Cancel</button></div></div>",
            size: 'sm',
            controller: function ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close(true);
                };

                $scope.cancel = function () {
                    $modalInstance.close(false);
                };
            }
        });

        modalInstance.result.then(function (confirmation) {
            if (confirmation) {
            }
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
