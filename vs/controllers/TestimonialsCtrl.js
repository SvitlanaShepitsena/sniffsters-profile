var TestimonialsCtrl = function () {
	function TestimonialsCtrl($scope, feedbacks, $state, toastr, DataService, CopyProfileService) {
		this.$scope = $scope;
		this.$state = $state;
		this.toastr = toastr;
		this.DataService = DataService;
		this.CopyProfileService = CopyProfileService;
		$scope.index.url = 'testimonials';
		$scope.testimonials = this;
		this.Feedbacks = feedbacks;
	}

	TestimonialsCtrl.prototype.ShowSuccess = function (note) {
		this.toastr.info(note);
	};
	TestimonialsCtrl.prototype.ShowError = function (note) {
		this.toastr.error(note);
	};
	return TestimonialsCtrl;
}();