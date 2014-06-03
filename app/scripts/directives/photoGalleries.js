
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
        link: function (scope, element, attrs) {
            var userName = angular.element($('#loggedUser')).html();
            var start = userName.indexOf(',') + 1;
            var finish = userName.indexOf('!');

            scope.userName = userName.substr(start, finish - start).trim();
        }
    };
};
