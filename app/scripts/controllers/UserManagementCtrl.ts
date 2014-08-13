/// <reference path="HomeCtrl.ts" />

interface IUserManagementScope extends IHomeScope {
    management:UserManagementCtrl;
    home:HomeCtrl;
}
class UserManagementCtrl {
    breeders:any;
    lookers:any;
    urlRef:string;

    constructor(public $scope, settings, $filter, public $modal, $timeout, public $firebase, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {

        $scope.message = {};
        this.urlRef = $scope.home.MainUrl + 'breeders';
        this.breeders = $firebase(new Firebase(this.urlRef));

        this.urlRef = $scope.home.MainUrl + 'lookers';
        this.lookers = $firebase(new Firebase(this.urlRef));

        $scope.management = this;

        $scope.showMessages = [];


        $scope.plan = {};
        $scope.modal = {
            "title": "New Message",
            show: true
        };

        $scope.popoverDelete = {
            "title": "Delete Forever?",
            template: '../../views/modals/delete-confirmation.html'
        };

        $scope.popoverPlans = {
            "title": "Breeder Plans",
            template: '../../views/modals/subscriptions.html'
        };
        $scope.changeS = (plan) => {
            $scope.plan.val = plan;
        }

        $scope.changePlan = (userName, plan) => {

            userName = $scope.home.FireProcess(userName);
            if (plan == 0) {
                var breederUrl = $scope.home.MainUrl + 'breeders/' + userName + '/subscriptions';

                var breederRef = $firebase(new Firebase(breederUrl));
                breederRef.$remove();
                toastr.success('Subscription plan has been changed.')

            } else {
                $scope.startNewPlan(userName, plan);
            }

        }
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
                                    if (key == planName) {
                                        feautureRestriction = feauture[key];
                                    }
                                });
                                userSubscriptions[feautureName] = feautureRestriction;

                            })
                            var breederUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.FireProcess(userName) + '/subscriptions';

                            var breederRef = $firebase(new Firebase(breederUrl));
                            breederRef.$remove();
                            breederRef.$add(userSubscriptions).then(() => {
                                toastr.success('Subscription plan has been changed.')
                            });

                        }
                    })
                });
            });
        }

        $scope.remove = (key)=> {
            if (_.isUndefined(key) || _.isNull(key)) {
                return;
            }
            this.breeders.$remove(key);
            this.lookers.$remove(key);
        }

        $scope.sendNewMessage = (sender, addressat, isBreeder) => {
            $scope.addressat = addressat;
            $scope.admin = "Admin";
            var messageTo = new Note();
            messageTo.body = $scope.message.body;
            messageTo.userName = $scope.admin;
            messageTo.isTrash = false;
            messageTo.sent = Date.now();
            messageTo.amISender = false;

            var userType = isBreeder ? 'breeders' : 'lookers';

            var receiverMessages = $scope.home.MainRefFire.$child(userType).$child($scope.addressat.replace(/\./g, '(p)')).$child('messages');
            receiverMessages.$add(messageTo);

            var messageFrom = new Note();
            messageFrom.body = $scope.message.body;
            messageFrom.userName = $scope.addressat;
            messageFrom.isTrash = false;
            messageFrom.sent = Date.now();
            messageFrom.amISender = true;

            var senderMessages = $scope.home.MainRefFire.$child('admins').$child('messages');
            senderMessages.$add(messageFrom).then(() => {
                toastr.success(settings.messageSuccessNotice);
            });
        }
    }

    ShowSuccess(note:string) {
        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }
}