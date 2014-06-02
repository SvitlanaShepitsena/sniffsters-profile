
var photoGalleries = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/photo-galleries.html',
        replace: true,
        scope: {
            galleries: '=',
            text: '@',
            func: '&'
        },
        controller: function ($scope) {
            $scope.ttt = "TEst";
        }
    };
};
