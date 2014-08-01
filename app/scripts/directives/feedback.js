/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase.d.ts" />
/// <reference path="../services/DataService.ts" />
var feedback = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/feedback.html',
        // replace directive tag with template info
        replace: true,
        /*        controller: ($scope, $firebase, $modal, DataService:DataService, $stateParams, $state, toastr) => {
        $scope.files = [];
        var feedbackId = $stateParams.id;
        $scope.home.auth.$getCurrentUser().then((user) => {
        $scope.home.Breedership($scope.home.FireProcess(user.email)).then(() => {
        var feedbackUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.FireProcess(user.email) + '/feedbacks' + feedbackId;
        //binding to firebase
        $scope.feedback = $firebase(new Firebase(feedbackUrl));
        })
        })
        
        $scope.remove = (key) => {
        $scope.feedback.$remove(key);
        }
        },*/
        link: function (scope, element, attrs) {
        }
    };
};
