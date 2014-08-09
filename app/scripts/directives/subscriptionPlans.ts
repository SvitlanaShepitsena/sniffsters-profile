/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../models/IBreederProfile.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/underscore/underscore.d.ts" />

interface ISubscriptionPlans extends ng.IScope {
    test:string;
}

var subscriptionPlans = ($popover, $filter, $firebase, settings, PlankeeperService)  => {


    return{
        restrict: 'E',
        templateUrl: 'views/directives/subscription-plans.html',
        scope: {
            home: '=',
            isAdmin: '='
        },
        replace: true,
        controller: ($scope, toastr) => {

            $scope.home.auth.$getCurrentUser().then((user) => {
                if (_.isNull(user)) {
                    return;
                }
                if (_.isUndefined(user.email))user.email = user.id;
                $scope.home.Breedership($scope.home.FireProcess(user.email)).then(() => {
                    $scope.features = $scope.home.MainRefFire.$child('subscriptions').$child('features');
                    $scope.plans = $scope.home.MainRefFire.$child('subscriptions').$child('plans');

                    $scope.feature = {};
                    $scope.popover = {
                        "title": "Add New Subscription Feature"
                    }
                    $scope.popoverDelete = {
                        "title": "Delete forever?",
                        template: '../../views/modals/delete-confirmation.html'
                    };
                })
            })

            $scope.setPlanToPay = (planName:string)=> {
                console.log('heehe');
                PlankeeperService.setPlan(planName);
            }

            $scope.startPlan = (planName:string) => {
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
                        plansArr.forEach((plan)=> {
                            if (planName == plan.name.toLowerCase()) {
                                if (!plan.hasOwnProperty('comment')) {
                                    return;
                                }
                                var comments = plan.comment.split(' ');
                                comments.forEach((comment)=> {
                                    var commentParsed = parseInt(comment);
                                    if (!_.isNaN(commentParsed)) {
                                        months = commentParsed;
                                        var days = months * 31;

                                        expirationDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);

                                        var userSubscriptions:any = {name: plan.name,
                                            startDate: new Date(Date.now()),
                                            expirationDate: expirationDate

                                        };
                                        feautures.forEach((feauture)=> {
                                            var feautureName = feauture.name;
                                            var feautureRestriction;
                                            var keys = _.keys(feauture);
                                            keys.forEach((key)=> {
                                                if (key == planName) {
                                                    feautureRestriction = feauture[key];
                                                }
                                            });
                                            userSubscriptions[feautureName] = feautureRestriction;

                                        })
                                        var breederUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.userNameFire + '/subscriptions';

                                        var breederRef = $firebase(new Firebase(breederUrl));
                                        breederRef.$remove();
                                        breederRef.$add(userSubscriptions).then(() => {
                                            toastr.success(settings.activeSubscriptionNotice)
                                        });
                                    }
                                })
                            }
                        })
                    });
                });
            }

            $scope.addNewFeature = () => {
                var newFeature = new Feature();
                newFeature.name = $scope.feature.name;
                newFeature.comment = $scope.feature.comment;

                $scope.features.$add(newFeature);
            }
            $scope.remove = (key) => {
                $scope.features.$remove(key);
            }

            $scope.savePlans = () => {
                $scope.features.$save().then(() => {
                    $scope.plans.$save().then(
                        () => {
                            toastr.success('success');
                        })
                });
            };
        },
        link: (scope, element, attrs:ng.IAttributes) => {
        }
    }
}

