
var photoGalleryEdit = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/photo-gallery-edit.html',
        transclude: true,
        replace: true,
        scope: {
            ctrl: '=',
            text: '@',
            func: '&'
        },
        link: function (scope, element, attrs) {
        }
    };
};
