var litter = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/litter.html',
        transclude: true,
        replace: true,
        scope: {
            l: '=',
            userName: '@'
        },
        controller: function ($scope) {
            $scope.today = function () {
                $scope.dt = new Date();
            };
            $scope.today();

            $scope.clear = function () {
                $scope.dt = null;
            };

            $scope.open = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
            };

            $scope.initDate = new Date();
            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[2];
        },
        link: function (scope, element, attrs) {
        }
    };
};
