
var photoGallery = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/photo-gallery.html',
        transclude: true,
        replace: true,
        scope: {
            galleries: '=',
            text: '@',
            func: '&'
        },
        controller: function ($scope, $stateParams) {
            var index = $stateParams.id;
            $scope.index = index;
        },
        link: function (scope, element, attrs) {
            var userName = angular.element($('#loggedUser')).html();
            var start = userName.indexOf(',') + 1;
            var finish = userName.indexOf('!');
            scope.userName = userName.substr(start, finish - start).trim();
        }
    };
};
