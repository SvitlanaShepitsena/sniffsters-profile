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
            func: '&',
            home: '='
        },
        controller($scope, $stateParams, $firebase, $modal) {
            var id = $stateParams.id;
            $scope.newBreed = {};

            $scope.addNewBreed = (breedName:string)=> {
                $scope.breeds.$add(breedName);
                $scope.newBreed = {};
            }
            $scope.popoverDelete = {
                "title": "Delete?",
                template: '../../views/modals/delete-confirmation.html'
            };
            $scope.remove = (key:string)=> {
                $scope.breeds.$remove(key);
            }
            $scope.breeds = $firebase(new Firebase($scope.home.MainUrl + "/breeders/" + id + '/profile/breeds'));
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
