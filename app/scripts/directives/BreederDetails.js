
var breederDetails = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/breeder-details.html',
        transclude: true,
        replace: true,
        scope: {
            ctrl: '=',
            text: '@',
            func: '&'
        },
        link: function (scope, element, attrs) {
            scope.IsEdit = false;

            scope.Edit = function () {
                scope.ctrl.Clone();
                scope.IsEdit = true;
            };

            scope.Cancel = function () {
                scope.IsEdit = false;
            };

            scope.Save = function () {
                scope.Save();
                scope.IsEdit = false;
            };
        }
    };
};
