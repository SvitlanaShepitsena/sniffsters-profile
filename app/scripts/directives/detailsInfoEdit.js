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
            scope.ResetAllFields = function () {
                scope.ctrl.BreederProfileEdit.KennelName = '';
                scope.ctrl.BreederProfileEdit.Website = '';
                scope.ctrl.BreederProfileEdit.Email = '';
                scope.ctrl.BreederProfileEdit.Phone = '';
                scope.ctrl.BreederProfileEdit.Location = '';
                scope.ctrl.BreederProfileEdit.State = '';
                scope.ctrl.BreederProfileEdit.Zip = "";
                scope.ctrl.BreederProfileEdit.City = "";
                scope.ctrl.BreederProfileEdit.Shipping = false;
                /*                console.log('reset');
                 scope.ctrl.BreederProfileEdit = new BreederProfile();*/
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
