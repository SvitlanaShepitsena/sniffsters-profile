/// <reference path="HomeCtrl.ts" />
var TestimonialsCtrl = (function () {
    function TestimonialsCtrl($scope, $firebase, $modal, $state, toastr, DataService, CopyProfileService) {
        var _this = this;
        this.$scope = $scope;
        this.$firebase = $firebase;
        this.$modal = $modal;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        this.CopyProfileService = CopyProfileService;
        $scope.home.auth.$getCurrentUser().then(function (user) {
            $scope.home.Breedership($scope.home.FireProcess(user.email)).then(function () {
                var feedbackUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.FireProcess(user.email) + '/feedbacks';

                //binding to firebase
                $scope.feedbacks = $firebase(new Firebase(feedbackUrl));
            });
        });
        this.FeedbacksNew = [];
        $scope.home.url = "testimonials";
        var fireTestimonials = this.$scope.testimonials = this;

        $scope.$watch("testimonials.FeedbacksNew", function () {
            for (var i = 0; i < _this.FeedbacksNew.length; i++) {
                var feedback = _this.FeedbacksNew[i];
                if (!(feedback.ClientName.length > 0 && feedback.FeedbackBody.length > 0 && feedback.ClientName.length < 250 && feedback.FeedbackBody.length < 500)) {
                    _this.$scope.isOk = true;
                    break;
                } else {
                    _this.$scope.isOk = false;
                }
            }
        }, true);
    }
    TestimonialsCtrl.prototype.addNewTestimonial = function () {
        this.FeedbacksNew.unshift(new Feedback());
    };

    TestimonialsCtrl.prototype.saveNewTestimonials = function () {
        var _this = this;
        this.FeedbacksNew.forEach(function (feedback) {
            _this.$scope.feedbacks.$add(feedback);
        });
        this.FeedbacksNew = [];
        this.ShowSuccess("Feedbacks have been successfully saved to Db");
    };

    TestimonialsCtrl.prototype.deleteFeedback = function (id) {
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
                _this.$scope.feedbacks.$remove(id);
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

    TestimonialsCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    TestimonialsCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return TestimonialsCtrl;
})();
