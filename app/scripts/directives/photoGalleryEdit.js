
var photoGalleryEdit = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/photo-gallery-edit.html',
        transclude: true,
        replace: true,
        scope: {
            galleries: '=',
            userName: '@',
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
