/// <reference path="HomeCtrl.ts" />
var TestimonialsCtrl = (function () {
    function TestimonialsCtrl($scope, $stateParams, settings, $filter, $firebase, $modal, $state, toastr, DataService, CopyProfileService) {
        var _this = this;
        this.$scope = $scope;
        this.settings = settings;
        this.$firebase = $firebase;
        this.$modal = $modal;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        this.CopyProfileService = CopyProfileService;
        $scope.home.auth.$getCurrentUser().then(function (user) {
            $scope.home.Breedership($scope.home.FireProcess(user.email)).then(function () {
                var feedbackUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.FireProcess($stateParams.uname) + '/feedbacks';

                //binding to firebase
                $scope.feedbacks = ($firebase(new Firebase(feedbackUrl)));
            });
        });

        $scope.rating = 0;
        this.FeedbacksNew = [];
        $scope.home.url = "testimonials";
        $scope.testimonials = this;

        $scope.isOk = false;

        $scope.$watch("testimonials.FeedbacksNew", function () {
            for (var i = 0; i < _this.FeedbacksNew.length; i++) {
                var feedback = _this.FeedbacksNew[i];
                if (!(feedback.ClientName.length > 0 && feedback.FeedbackBody.length > 0) && (feedback.ClientName.length < 250 && feedback.FeedbackBody.length < 500)) {
                    _this.$scope.isOk = true;
                    break;
                } else {
                    _this.$scope.isOk = false;
                }
            }
        }, true);
        $scope.remove = function (key) {
            _this.$scope.feedbacks.$remove(key);
        };
    }
    TestimonialsCtrl.prototype.cancelNew = function () {
        this.FeedbacksNew = [];
    };

    TestimonialsCtrl.prototype.addNewTestimonial = function () {
        var feedback = new Feedback();
        if (!this.$scope.home.isOwner) {
            feedback.ClientName = this.$scope.home.nickName;
        }

        this.FeedbacksNew.unshift(feedback);
    };

    TestimonialsCtrl.prototype.saveNewTestimonials = function () {
        var _this = this;
        this.FeedbacksNew.forEach(function (feedback) {
            _this.$scope.feedbacks.$add(feedback);
        });
        this.FeedbacksNew = [];
        this.ShowSuccess(this.settings.dataSaved);
    };

    TestimonialsCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    TestimonialsCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return TestimonialsCtrl;
})();
