/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../models/IBreederProfile.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/underscore/underscore.d.ts" />

var previousPuppies = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/previous-puppies.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        controller: function ($scope, $stateParams, $firebase, $filter) {
            var galleriesUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.FireProcess($stateParams.uname) + '/galleries';
            $scope.galleries = $firebase(new Firebase(galleriesUrl));

            $scope.selectRandomPicture = function (galleries) {
                var photosArr = [];

                var galleriesArr = ($filter('orderByPriority')(galleries));
                console.log(galleriesArr);
                galleriesArr.forEach(function (gallery) {
                    gallery.Photos.forEach(function (photo) {
                        photosArr.push(photo);
                    });
                });

                console.log(photosArr.length);
            };

            $scope.selectRandomPicture($scope.galleries);

            $scope.g = new Gallery();
            $scope.g.isPrevPuppy = true;

            $scope.g.Title = "Our Previous Puppies Photos";
            $scope.btnTitle = "Add Photos";

            $scope.$watch('g.Photos', function (collection) {
                if (collection.length > 0) {
                    $scope.btnTitle = "Add More Photos";
                }
            }, true);

            $scope.savePrevPuppies = function () {
                var galleriesUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.FireProcess($stateParams.uname) + '/galleries';
                $scope.galleries = $firebase(new Firebase(galleriesUrl));

                if ($scope.g.Title === "") {
                    $scope.g.Title = "Our Previous Puppies Photos";
                }
                var galleryShort = _.omit($scope.g, 'Photos');
                $scope.galleries.$add(galleryShort).then(function (key) {
                    $scope.g.Photos.forEach(function (photo) {
                        $scope.galleries.$child(key.name()).$child('Photos').$add(_.omit(photo, 'isSized'));
                    });
                    $scope.g = new Gallery();
                    $scope.g.Title = "Our Previous Puppies Photos";
                    $scope.btnTitle = "Add Photos";
                });
            };
        },
        link: function (scope, element, attrs) {
        }
    };
};
