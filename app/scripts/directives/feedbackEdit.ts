/// <reference path="../models/IBreederProfile.ts" />
/// <reference path="../controllers/HomeCtrl.ts" />
interface IFeedbackEdit extends ng.IScope {
    test:string;
}

var feedbackEdit:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/feedback-edit.html',
        // replace directive tag with template info
        replace: true,
        controller: ($scope, $stateParams, $firebase, $state) => {
            var id:string = $stateParams.id;

            $scope.home.auth.$getCurrentUser().then((user) => {
                $scope.home.Breedership($scope.home.FireProcess(user.email)).then(() => {
                    var feedbackUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.FireProcess(user.email) + '/feedbacks/' + id;
                    $scope.feedback = $firebase(new Firebase(feedbackUrl));
                })
            })
            $scope.updateFeedback = (clientName, body) => {
                var feedbackNew:IFeedback = new Feedback();
                feedbackNew.ClientName = clientName;
                feedbackNew.FeedbackBody = body;


                $scope.feedback.$set(
                    {ClientName: clientName,
                        FeedbackBody: body}).then(() => {
                        $state.go('^');
                    });

            }
        }
    }
}
