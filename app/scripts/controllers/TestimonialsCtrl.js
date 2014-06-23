var TestimonialsCtrl = (function () {
	function TestimonialsCtrl($scope, $modal, feedbacks, $state, toastr, DataService, CopyProfileService) {
		this.$scope = $scope;
		this.$modal = $modal;
		this.$state = $state;
		this.toastr = toastr;
		this.DataService = DataService;
		this.CopyProfileService = CopyProfileService;
		$scope.index.url = "testimonials";
		this.FeedbacksNew = [];
		$scope.testimonials = this;
		this.Feedbacks = feedbacks;
	}

	TestimonialsCtrl.prototype.addNewTestimonial = function () {
		this.FeedbacksNew.unshift(new Feedback());
	};

	TestimonialsCtrl.prototype.saveNewTestimonials = function () {
		var _this = this;
		this.DataService.saveNewTestimonials(this.FeedbacksNew).then(function (feedbacks) {
			feedbacks.forEach(function (feedback) {
				_this.Feedbacks.unshift(feedback);
			});
			_this.FeedbacksNew = [];
			_this.ShowSuccess("Feedbacks have been successfully saved to Db");
		});
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
	return TestimonialsCtrl;
})();
