/// <reference path="HomeCtrl.ts" />

class PaymentSuccessCtrl {

    constructor(public $scope, $filter, settings, public $state:ng.ui.IStateService, public toastr:Toastr, public PlankeeperService, public $firebase) {
        $scope.paymentSuccess = this;


        $scope.startNewPlan = (userName:string, planName:string) => {
            var subscriptionsUrl = $scope.home.MainUrl + 'subscriptions';
            var plansUrl = subscriptionsUrl + "/plans";
            var featuresUrl = subscriptionsUrl + "/features";


            var featuresRef = $firebase(new Firebase(featuresUrl));
            featuresRef.$on('value', (snapshot:any)=> {
                var featuresFire = snapshot.snapshot.value;
                var feautures = $filter('orderByPriority')(featuresFire);
                ///////////////////////


                var expirationDate;

                var today = new Date();
                var months:number;
                var plansRef = $firebase(new Firebase(plansUrl));
                plansRef.$on('value', (snapshot:any)=> {
                    var plans = snapshot.snapshot.value;
                    var plansArr = $filter('orderByPriority')(plans);
                    plansArr.forEach((planElement)=> {
                        if (planName == planElement.name) {

                            if (planElement.hasOwnProperty('comment')) {

                                var comments = planElement.comment.split(' ');
                                comments.forEach((comment)=> {
                                    var commentParsed = parseInt(comment);
                                    if (!_.isNaN(commentParsed)) {
                                        months = commentParsed;
                                        var days = months * 31;

                                        expirationDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
                                    }
                                })
                            }

                            if (planElement.name == 'Monthly') {
                                expirationDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
                            }

                            if (planElement.name == 'Annually') {
                                expirationDate = new Date(today.getTime() + 365 * 24 * 60 * 60 * 1000);
                            }


                            var userSubscriptions:any = {name: planElement.name,
                                startDate: new Date(Date.now()),
                                expirationDate: expirationDate

                            };

                            feautures.forEach((feauture)=> {
                                var feautureName = feauture.name;
                                var feautureRestriction;
                                var keys = _.keys(feauture);
                                keys.forEach((key)=> {
                                    if (key.toLowerCase() == planName.toLowerCase()) {
                                        feautureRestriction = feauture[key];
                                    }
                                });
                                userSubscriptions[feautureName] = feautureRestriction;

                            })
                            var breederUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.FireProcess(userName) + '/subscriptions';
                            console.log(breederUrl);

                            var breederRef = $firebase(new Firebase(breederUrl));
                            breederRef.$remove();
                            breederRef.$add(userSubscriptions).then(() => {
                                toastr.success(settings.monthlySubscriptionNotice)
                            });

                        }
                    })
                });
            });
        }
        this.$scope.home.auth.$getCurrentUser().then((user) => {
            this.$scope.home.Breedership(this.$scope.home.FireProcess(user.email)).then(() => {

                $scope.startNewPlan(user.email, 'Monthly');

                $state.go('user.profile.about1', {uname: user.email});
            })
        })
    }

    ShowSuccess(note:string) {
        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }
}