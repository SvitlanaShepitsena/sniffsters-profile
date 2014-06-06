
var photoGallery = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/photo-gallery.html',
        replace: true,
        controller: function ($scope, $stateParams) {
            var id = $stateParams.id;
        },
        link: function (scope, element, attrs) {
        }
    };
};
