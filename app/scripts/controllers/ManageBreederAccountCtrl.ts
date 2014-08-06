/// <reference path="HomeCtrl.ts" />

class ManageBreederAccountCtrl {

    constructor(public $scope, public settings, public $state:ng.ui.IStateService, public toastr:Toastr, public $firebase) {
        $scope.manageBreederAccount = this;

        var subscriptionUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.userNameFire + '/subscriptions';
        $scope.subscription = $firebase(new Firebase(subscriptionUrl));
        $scope.cancelSubscription = () => {
            $scope.subscription.$remove().then(() => {
                this.ShowSuccess(this.settings.delSubscriptionNotice);
            });
        }
        $scope.popoverCancelSubscription = {
            "title": "Deactivate your subscription plan?",
            template: '../../views/modals/cancel-subscription.html'
        };
    }

    ShowSuccess(note:string) {
        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }
}