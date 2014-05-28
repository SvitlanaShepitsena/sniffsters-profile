/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../controllers/IndexCtrl.ts" />

var detailsInfoEdit = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/details-info-edit.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',
            text: '@',
            func: '&'
        },
        link: function (scope, element, attrs) {
            scope.ResetFields = function () {
                console.log('reset');
                scope.ctrl.BreederProfileEdit = new BreederProfile();
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
//# sourceMappingURL=detailsInfoEdit.js.map
