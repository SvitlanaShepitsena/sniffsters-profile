/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../services/DataService.ts" />
var litter = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/litter.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        controller: function ($scope, DataService, $modal, $upload, toastr) {
            $scope.deleteLitterPhoto = function (id) {
                var modalInstance = $modal.open({
                    template: "<div><div class=\"modal-body\">Delete this photo?</div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-click=\"ok()\">OK</button><button class=\"btn btn-warning\" ng-click=\"cancel()\">Cancel</button></div></div>",
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
                        console.log($scope.l.photos.$remove(id));
                    }
                });
            };

            $scope.today = function () {
                $scope.dt = new Date();
            };
            $scope.today();

            $scope.clear = function () {
                $scope.dt = null;
            };

            $scope.open = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
            };

            $scope.initDate = new Date();
            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[2];
        }
    };
};
