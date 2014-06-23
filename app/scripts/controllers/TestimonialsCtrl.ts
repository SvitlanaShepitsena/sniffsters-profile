/// <reference path="IndexCtrl.ts" />

interface ITestimonialsScope extends IMainScope {
	testimonials:TestimonialsCtrl;
	ctrl:IndexCtrl;
}
class TestimonialsCtrl {
	Feedbacks:IFeedback[];
	FeedbacksNew:IFeedback[];

	constructor(public $scope:ITestimonialsScope, public $modal, feedbacks:IFeedback[], public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService, public CopyProfileService:CopyProfileService) {
		$scope.index.url = "testimonials";
		this.FeedbacksNew = [];
		$scope.testimonials = this;
		this.Feedbacks = feedbacks;
	}

	addNewTestimonial() {
		this.FeedbacksNew.unshift(new Feedback());
	}

	saveNewTestimonials() {
		this.DataService.saveNewTestimonials<IFeedback>(this.FeedbacksNew).then((feedbacks:IFeedback[]) => {
			feedbacks.forEach((feedback)=> {
				this.Feedbacks.unshift(feedback);
			})
			this.FeedbacksNew = [];
			this.ShowSuccess("Feedbacks have been successfully saved to Db");
		})
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

}