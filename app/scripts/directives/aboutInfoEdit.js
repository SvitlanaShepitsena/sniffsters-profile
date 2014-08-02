/// <reference path="../app.ts" />
var aboutInfoEdit = function () {
    return {
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
        controller: function ($scope, $stateParams, $firebase, $modal) {
            var id = $stateParams.id;

            //            var id = $scope.home.FireProcess($stateParams.uname);
            $scope.newBreed = {};

            $scope.addNewBreed = function (breedName) {
                $scope.breeds.$add(breedName);
                $scope.newBreed = {};
            };
            $scope.popoverDelete = {
                "title": "Delete?",
                template: '../../views/modals/delete-confirmation.html'
            };
            $scope.remove = function (key) {
                $scope.breeds.$remove(key);
            };
            $scope.breeds = $firebase(new Firebase($scope.home.MainUrl + "/breeders/" + id + '/profile/breeds'));
        },
        link: function (scope, element, attrs) {
            //            SCOPE (USE just {{test}} . )
            //            scope.ctrl.url = 'about';
            //            console.log(scope.form.$dirty=true);
            //            console.log(scope.form);
            scope.ResetAllFields = function () {
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
            };

            scope.Next = function () {
                //                scope.ctrl.Next('profile.photos');
            };
        }
    };
};
