/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../services/DataService.ts" />

var photoGallery = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/photo-gallery.html',
        // replace directive tag with template info
        replace: true,
        controller: function ($scope, $firebase, $modal, DataService, $stateParams, $state, toastr) {
            $scope.home.isLoadFinished = false;

            var galleryId = $stateParams.id;
            var username = $scope.home.FireProcess($stateParams.uname);
            var galleryUrl = $scope.home.MainUrl + 'breeders/' + username + '/galleries/' + galleryId;
            $scope.gallery = $firebase(new Firebase(galleryUrl));

            $scope.home.auth.$getCurrentUser().then(function (user) {
                if (user == null) {
                    $scope.home.isLoadFinished = true;
                    return;
                }
                $scope.home.Breedership($scope.home.FireProcess(user.email)).then(function () {
                    $scope.home.isLoadFinished = true;
                });
            });

            $scope.remove = function (key) {
                $scope.gallery.$remove(key).then(function () {
                    $state.go('^');
                });
            };
        },
        link: function (scope, element, attrs) {
        }
    };
};
