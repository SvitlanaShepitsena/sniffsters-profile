/// <reference path="HomeCtrl.ts" />
var TestimonialsCtrl = (function () {
    function TestimonialsCtrl($scope, settings, $firebase, $modal, $state, toastr, DataService, CopyProfileService) {
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
                var feedbackUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.FireProcess(user.email) + '/feedbacks';

                //binding to firebase
                $scope.feedbacks = $firebase(new Firebase(feedbackUrl));
            });
        });
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
    TestimonialsCtrl.prototype.addNewTestimonial = function () {
        this.FeedbacksNew.unshift(new Feedback());
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
