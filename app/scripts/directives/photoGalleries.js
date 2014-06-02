
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
            var pos = userName.indexOf(',') + 1;

            scope.userName = userName.substr(pos).trim();

            console.log("I am here");
        }
    };
};
