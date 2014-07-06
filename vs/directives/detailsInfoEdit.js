var detailsInfoEdit = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/details-info-edit.html',
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
                scope.ctrl.BreederProfileEdit.Website = '';
                scope.ctrl.BreederProfileEdit.Email = '';
                scope.ctrl.BreederProfileEdit.Phone = '';
                scope.ctrl.BreederProfileEdit.Location = '';
                scope.ctrl.BreederProfileEdit.State = '';
                scope.ctrl.BreederProfileEdit.Zip = '';
                scope.ctrl.BreederProfileEdit.City = '';
                scope.ctrl.BreederProfileEdit.Shipping = false;
            };
            scope.SaveKennelName = function () {
                var breederProfileOriginal = scope.ctrl.GetClone();
                breederProfileOriginal.KennelName = scope.ctrl.BreederProfileEdit.KennelName;
                breederProfileOriginal.Story = scope.ctrl.BreederProfileEdit.Story;
                scope.ctrl.Save(breederProfileOriginal);
            };
        }
    };
};