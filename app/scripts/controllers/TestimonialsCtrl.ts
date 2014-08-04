/// <reference path="HomeCtrl.ts" />

class TestimonialsCtrl {
    Feedbacks:IFeedback[];
    FeedbacksNew:IFeedback[];

    constructor(public $scope, public settings, public $firebase, public $modal, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService, public CopyProfileService:CopyProfileService) {
        $scope.home.auth.$getCurrentUser().then((user) => {
            $scope.home.Breedership($scope.home.FireProcess(user.email)).then(() => {
                var feedbackUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.FireProcess(user.email) + '/feedbacks';
                //binding to firebase
                $scope.feedbacks = $firebase(new Firebase(feedbackUrl));
            })
        })
        this.FeedbacksNew = [];
        $scope.home.url = "testimonials";
        $scope.testimonials = this;

        $scope.isOk = false;

        $scope.$watch("testimonials.FeedbacksNew", () => {
            for (var i = 0; i < this.FeedbacksNew.length; i++) {
                var feedback:IFeedback = this.FeedbacksNew[i];
                if (!(feedback.ClientName.length > 0 && feedback.FeedbackBody.length > 0) &&
                    (feedback.ClientName.length < 250 && feedback.FeedbackBody.length < 500 )) {
                    this.$scope.isOk = true;
                    break;
                }
                else {
                    this.$scope.isOk = false;
                }
            }
        }, true);
        $scope.remove = (key)=> {
            this.$scope.feedbacks.$remove(key);
        }
    }

    addNewTestimonial() {
        this.FeedbacksNew.unshift(new Feedback());
    }

    saveNewTestimonials() {
        this.FeedbacksNew.forEach((feedback:IFeedback)=> {
            this.$scope.feedbacks.$add(feedback);
        });
        this.FeedbacksNew = [];
        this.ShowSuccess(this.settings.dataSaved);
    }

    ShowSuccess(note:string) {
        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }
}