
var photoGallery = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/photo-gallery.html',
        replace: true,
        controller: function ($scope, $stateParams) {
            console.log($scope.photosCtrl);
        },
        link: function (scope, element, attrs) {
        }
    };
};
