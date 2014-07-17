/// <reference path="HomeCtrl.ts" />

class TestimonialsCtrl {
    Feedbacks:IFeedback[];
    FeedbacksNew:IFeedback[];

    constructor(public $scope, public $firebase, public $modal, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService, public CopyProfileService:CopyProfileService) {
        $scope.home.auth.$getCurrentUser().then((user) => {
            $scope.home.Breedership($scope.home.FireProcess(user.email)).then(() => {
                var feedbacksUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.FireProcess(user.email) + '/feedbacks';
                //binding to firebase
                $scope.feedbacks = $firebase(new Firebase(feedbacksUrl));
            })
        })
        this.FeedbacksNew = [];
        $scope.home.url = "testimonials";
        var fireTestimonials = this.
            $scope.testimonials = this;

        $scope.$watch("testimonials.FeedbacksNew", () => {
            for (var i = 0; i < this.FeedbacksNew.length; i++) {
                var feedback:IFeedback = this.FeedbacksNew[i];
                if (!(feedback.ClientName.length > 0 && feedback.FeedbackBody.length > 0 &&
                    feedback.ClientName.length < 250 && feedback.FeedbackBody.length < 500 )) {
                    this.$scope.isOk = true;
                    break;
                } else {

                    this.$scope.isOk = false;
                }
            }
        }, true);


    }

    addNewTestimonial() {
        this.FeedbacksNew.unshift(new Feedback());
    }

    saveNewTestimonials() {
        this.FeedbacksNew.forEach((feedback:IFeedback)=> {
            this.$scope.feedbacks.$add(feedback);
        });
        this.FeedbacksNew = [];
        this.ShowSuccess("Feedbacks have been successfully saved to Db");
    }

    deleteFeedback(id:string) {

        var modalInstance = this.$modal.open({
            template: "<div><div class=\"modal-body\">Delete this Feedback?</div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-click=\"ok()\">OK</button><button class=\"btn btn-warning\" ng-click=\"cancel()\">Cancel</button></div></div>",
            size: 'sm',
            controller: ($scope, $modalInstance) => {
                $scope.ok = () => {
                    $modalInstance.close(true)
                }

                $scope.cancel = () => {
                    $modalInstance.close(false)
                }
            }
        });

        modalInstance.result.then((confirmation:boolean) => {
            if (confirmation) {

                this.$scope.feedbacks.$remove(id);
            }
        })
    }

    updateFeedBack(feedback:IFeedback) {
        this.DataService.updateFeedback(feedback).then(() => {
            this.ShowSuccess("Feedback has been successfully saved to Db");
            this.$state.go('^');
        })
    }

    ShowSuccess(note:string) {
        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}