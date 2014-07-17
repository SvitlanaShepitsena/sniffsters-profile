/// <reference path="../models/IBreederProfile.ts" />
/// <reference path="../controllers/HomeCtrl.ts" />

var feedbackEdit = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/feedback-edit.html',
        // replace directive tag with template info
        replace: true,
        controller: function ($scope, $stateParams, $firebase, $state) {
            var id = $stateParams.id;

            $scope.home.auth.$getCurrentUser().then(function (user) {
                $scope.home.Breedership($scope.home.FireProcess(user.email)).then(function () {
                    var feedbackUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.FireProcess(user.email) + '/feedbacks/' + id;
                    $scope.feedback = $firebase(new Firebase(feedbackUrl));
                });
            });
            $scope.updateFeedback = function (clientName, body) {
                var feedbackNew = new Feedback();
                feedbackNew.ClientName = clientName;
                feedbackNew.FeedbackBody = body;

                $scope.feedback.$set({
                    ClientName: clientName,
                    FeedbackBody: body }).then(function () {
                    $state.go('^');
                });
            };
        }
    };
};
