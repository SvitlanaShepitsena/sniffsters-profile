/// <reference path="HomeCtrl.ts" />

class TestimonialsCtrl {
    Feedbacks:IFeedback[];
    FeedbacksNew:IFeedback[];

    constructor(public $scope, public $firebase, public $modal, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService, public CopyProfileService:CopyProfileService) {
        var feedbackUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.userNameFire + '/feedbacks';
        //binding to firebase
        $scope.feedbacks = $firebase(new Firebase(feedbackUrl));

        $scope.home.url = "testimonials";
        var fireTestimonials = this.
            $scope.testimonials = this;

    }

    addNewTestimonial() {
        this.FeedbacksNew.unshift(new Feedback());
    }

    saveNewTestimonials() {
        /*        this.DataService.saveNewTestimonials<IFeedback>(this.FeedbacksNew).then((feedbacks:IFeedback[]) => {
         feedbacks.forEach((feedback)=> {
                this.Feedbacks.unshift(feedback);
            })
            this.FeedbacksNew = [];
            this.ShowSuccess("Feedbacks have been successfully saved to Db");
         })*/
    }

    ShowSuccess(note:string) {
        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

    deleteFeedback(feedback:IFeedback, index:number) {

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

                this.DataService.deleteFeedback(feedback.Id).then(() => {
                    this.Feedbacks.splice(index, 1);
                })
            }
        })
    }

    updateFeedBack(feedback:IFeedback) {
        this.DataService.updateFeedback(feedback).then(() => {
            this.ShowSuccess("Feedback has been successfully saved to Db");
            this.$state.go('^');
        })
    }
}