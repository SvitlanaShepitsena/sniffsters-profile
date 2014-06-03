
var photoGalleries = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/photo-galleries.html',
        replace: true,
        scope: {
            galleries: '=',
            id: '@',
            func: '&'
        },
        link: function (scope, element, attrs) {
        }
    };
};
