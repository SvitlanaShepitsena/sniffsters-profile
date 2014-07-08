var litterInfo = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/litter-info.html',
        transclude: true,
        replace: true,
        scope: {
            l: '=',
            puppies: '=',
            userName: '@'
        },
        controller: function ($scope, $stateParams) {
            var id = $stateParams.id;
            $scope.puppies.SelectedLitter = $scope.puppies.Litters[id];
        },
        link: function (scope, element, attrs) {
        }
    };
};
