/// <reference path="../app.ts" />

var aboutInfoEdit:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/about-info-edit.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',
            isOwner: '=',
            text: '@',
            func: '&'
        },
        link: (scope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
//            SCOPE (USE just {{test}} . )
//            scope.ctrl.url = 'about';
//            console.log(scope.form.$dirty=true);
//            console.log(scope.form);

            scope.ResetAllFields = () => {

                scope.ctrl.BreederProfileEdit.KennelName = '';
                scope.ctrl.BreederProfileEdit.Story = '';
                scope.ctrl.BreederProfileEdit.Parents = '';
                scope.ctrl.BreederProfileEdit.Boys = '';
                scope.ctrl.BreederProfileEdit.Girls = '';
                scope.ctrl.BreederProfileEdit.AddInfo = '';
                scope.form.$setDirty();
//                scope.form.$setPristine();
//                scope.form.addInfo.$setPristine();

//                scope.ctrl.BreederProfileEdit = new BreederProfile();
            }

            scope.Next = () => {
//                scope.ctrl.Next('profile.photos');
            }
        }
    }
}
