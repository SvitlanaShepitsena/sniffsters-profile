
var photoGallery = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/photo-gallery.html',
        transclude: true,
        replace: true,
        scope: {
            galleries: '=',
            id: '@',
            func: '&'
        },
        controller: function ($scope, $stateParams) {
            var index = $stateParams.id;
            $scope.index = index;
        },
        link: function (scope, element, attrs) {
        }
    };
};
