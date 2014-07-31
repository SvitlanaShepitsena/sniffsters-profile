/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
var photoGalleryEdit = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/photo-gallery-edit.html',
        // replace directive tag with template info
        replace: true,
        controller: function ($scope, $state, $modal) {
            $scope.files = [];

            $scope.saveGallery = function () {
                var photos = $scope.gallery.$child('Photos');

                $scope.files.forEach(function (photo, index) {
                    photos.$add(photo);
                });

                $scope.gallery.$save().then(function () {
                    $state.go('^');
                });
            };
            $scope.saveTitle = function () {
                $scope.gallery.$save('Title').then(function () {
                    //                    $state.go('^');
                });
            };

            $scope.remove = function (key) {
                $scope.gallery.$child('Photos').$child(key).$remove();
            };
        }
    };
};
