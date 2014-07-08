var aboutInfoEdit = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/about-info-edit.html',
        transclude: true,
        replace: true,
        scope: {
            ctrl: '=',
            text: '@',
            func: '&'
        },
        link: function (scope, element, attrs) {
            scope.ResetAllFields = function () {
                scope.ctrl.BreederProfileEdit.KennelName = '';
                scope.ctrl.BreederProfileEdit.Story = '';
                scope.ctrl.BreederProfileEdit.Parents = '';
                scope.ctrl.BreederProfileEdit.Boys = '';
                scope.ctrl.BreederProfileEdit.Girls = '';
                scope.ctrl.BreederProfileEdit.AddInfo = '';
                scope.form.$setDirty();
            };

            scope.Next = function () {
            };
        }
    };
};
