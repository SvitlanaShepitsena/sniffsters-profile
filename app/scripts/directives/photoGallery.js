/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../services/DataService.ts" />

var photoGallery = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/photo-gallery.html',
        // replace directive tag with template info
        replace: true,
        controller: function ($scope, $firebase, $modal, DataService, $stateParams, $state, toastr) {
            var galleryId = $stateParams.id;

            $scope.home.auth.$getCurrentUser().then(function (user) {
                $scope.home.Breedership($scope.home.FireProcess(user.email)).then(function () {
                    var galleryUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.FireProcess(user.email) + '/galleries/' + galleryId;
                    $scope.gallery = $firebase(new Firebase(galleryUrl));
                });
            });

            //            $scope.gallery = $scope.galleries[galleryId];
            $scope.delGallery = function () {
                var modalInstance = $modal.open({
                    template: "<div><div class=\"modal-body\"> Delete this gallery?</div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-click=\"ok()\">OK</button><button class=\"btn btn-warning\" ng-click=\"cancel()\">Cancel</button></div></div>",
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
                        $scope.gallery.$remove().then(function () {
                            $state.go('^');
                        });
                    }
                });
            };
        },
        link: function (scope, element, attrs) {
        }
    };
};
