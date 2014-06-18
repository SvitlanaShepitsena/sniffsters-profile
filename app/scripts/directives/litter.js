var litter = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/litter.html',
        transclude: true,
        replace: true,
        scope: {
            l: '=',
            text: '@',
            func: '&'
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

            $scope.minDate = new Date('2014-01-01');

            $scope.initDate = new Date('2014-01-01');
            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];
        },
        link: function (scope, element, attrs) {
        }
    };
};
