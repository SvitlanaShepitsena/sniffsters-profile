/// <reference path="HomeCtrl.ts" />

class ManageBreederAccountCtrl {

    constructor(public $scope, public settings, public $state:ng.ui.IStateService, public toastr:Toastr, public $firebase) {
        $scope.manageBreederAccount = this;
        this.$scope.home.auth.$getCurrentUser().then((user) => {
            this.$scope.home.Breedership(this.$scope.home.FireProcess(user.email)).then(() => {

                var subscriptionUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.FireProcess(user.email) + '/subscriptions';
                $scope.subscription = $firebase(new Firebase(subscriptionUrl));
                $scope.subscription.$on('value', (snapshot:any)=> {
                    $scope.hasSubscription = (!_.isEmpty(snapshot.snapshot.value));
                });

                var breederUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.FireProcess(user.email);
                $scope.breeder = $firebase(new Firebase(breederUrl));
            })
        })


        $scope.remove = (key) => {
            $scope.breeder.$remove().then(() => {
                $scope.home.Logout();
//                this.ShowSuccess(this.settings.delSubscriptionNotice);
            });
        }
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