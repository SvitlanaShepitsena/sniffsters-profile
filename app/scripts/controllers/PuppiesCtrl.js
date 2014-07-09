/// <reference path="IndexCtrl.ts" />
var PuppiesCtrl = (function () {
    function PuppiesCtrl($scope, $modal, $state, toastr, DataService, CopyProfileService) {
        var _this = this;
        this.$scope = $scope;
        this.$modal = $modal;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        this.CopyProfileService = CopyProfileService;
        $scope.index.url = 'puppies';
        $scope.isOk = false;

        this.LittersNew = [];
        $scope.puppies = this;
        DataService.getLitters($scope.index.IdFire).then(function (litters) {
            _this.Litters = litters;
        });

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

    PuppiesCtrl.prototype.setSelectedLitter = function (litterId) {
        var litid = 0;
        var index = 0;

        this.Litters.forEach(function (litter) {
            if (litter.Id === litterId) {
                litid = index;
                return false;
            }
            index++;
        });
        this.SelectedLitter = this.Litters[litid];
        this.$state.go('profile.puppies3.litter', { 'id': litid });
        //        console.log("Hello");
    };

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
        var _this = this;
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
                _this.DataService.deleteLitter(_this.SelectedLitter.Id).then(function () {
                    var index = 0;
                    _this.Litters.forEach(function (litter) {
                        if (litter.Id === _this.SelectedLitter.Id) {
                            _this.Litters.splice(index, 1);
                            return false;
                        }
                        index++;
                    });
                    _this.$state.go('^');
                });
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
