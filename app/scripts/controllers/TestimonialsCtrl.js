/// <reference path="HomeCtrl.ts" />
var TestimonialsCtrl = (function () {
    function TestimonialsCtrl($scope, $firebase, $modal, $state, toastr, DataService, CopyProfileService) {
        this.$scope = $scope;
        this.$firebase = $firebase;
        this.$modal = $modal;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        this.CopyProfileService = CopyProfileService;
        var feedbackUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.userNameFire + '/feedbacks';

        //binding to firebase
        $scope.feedbacks = $firebase(new Firebase(feedbackUrl));

        $scope.home.url = "testimonials";
        var fireTestimonials = this.$scope.testimonials = this;
    }

    TestimonialsCtrl.prototype.addNewTestimonial = function () {
        this.FeedbacksNew.unshift(new Feedback());
    };

    TestimonialsCtrl.prototype.saveNewTestimonials = function () {
        /*        this.DataService.saveNewTestimonials<IFeedback>(this.FeedbacksNew).then((feedbacks:IFeedback[]) => {
         feedbacks.forEach((feedback)=> {
         this.Feedbacks.unshift(feedback);
         })
         this.FeedbacksNew = [];
         this.ShowSuccess("Feedbacks have been successfully saved to Db");
         })*/
    };

    TestimonialsCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    TestimonialsCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };

    TestimonialsCtrl.prototype.deleteFeedback = function (feedback, index) {
        var _this = this;
        var modalInstance = this.$modal.open({
            template: "<div><div class=\"modal-body\">Delete this Feedback?</div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-click=\"ok()\">OK</button><button class=\"btn btn-warning\" ng-click=\"cancel()\">Cancel</button></div></div>",
            size: 'sm',
            controller: function ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close(true);
                };

                $scope.cancel = function () {
                    $modalInstance.close(false);
                };
            }
        });

        modalInstance.result.then(function (confirmation) {
            if (confirmation) {
                _this.DataService.deleteFeedback(feedback.Id).then(function () {
                    _this.Feedbacks.splice(index, 1);
                });
            }
        });
    };

    TestimonialsCtrl.prototype.updateFeedBack = function (feedback) {
        var _this = this;
        this.DataService.updateFeedback(feedback).then(function () {
            _this.ShowSuccess("Feedback has been successfully saved to Db");
            _this.$state.go('^');
        });
    };
    return TestimonialsCtrl;
})();
