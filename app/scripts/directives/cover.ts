/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../../dist/bower_components/DefinitelyTyped/firebase/firebase.d.ts" />
/// <reference path="../../../dist/bower_components/DefinitelyTyped/underscore/underscore.d.ts" />

var cover:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/cover.html',
        // replace directive tag with template info
        replace: true,
        controller: ($scope, $firebase, $filter, $modal) => {
            $scope.showChangeBtn = false;

            $scope.chgBtnShown = () => {
                $scope.showChangeBtn = true;
            }
            $scope.chgBtnHidden = () => {
                $scope.showChangeBtn = false;
            }

            $scope.showChangeCoverBtn = false;

            $scope.chgCoverBtnShown = () => {
                $scope.showCgangeCoverBtn = true;
            };

            $scope.chgCoverBtnShown = () => {
                $scope.showCgangeCoverBtn = false;
            };

            $scope.show64 = () => {
                console.log('test12');
            }

            $scope.home.auth.$getCurrentUser().then((user) => {
                $scope.home.Breedership($scope.home.FireProcess(user.email)).then(() => {

                    var profilePicUrl = $scope.home.MainUrl;
                    profilePicUrl += ($scope.home.isBreeder) ? 'breeders/' : 'lookers/';
                    profilePicUrl += $scope.home.FireProcess(user.email) + '/images/avatar';

                    $scope.avatar = $firebase(new Firebase(profilePicUrl));

                    $scope.avatar.$on('value', (snapshot:any)=> {
                        $scope.isAvatarChanged = !_.isEmpty(snapshot.snapshot.value);
                        $scope.avatarsrc = _.values(snapshot.snapshot.value)[0];
                    });

                    $scope.changePicture = () => {
                        var modalInstance = $modal.open({
                            template: '<div class="row">' +
                                '<div class="col-xs-12 avatarModel">' +
                                '<sv-image-upload ' +
                                ' is-mult=false' +
                                ' sm=true' +
                                ' fire-ref="avatar"' +
                                ' file-size="3000000"' +
                                ' width=163' +
                                ' height=163' +
                                ' btn-title="Upload Picture"' +
                                ' close-modal="hide()"' +
                                ' ok-modal="okModal(file64)"' +
                                ' show64="show64()"' +
                                '></sv-image-upload><p> <button class="btn btn-default pull-right" ng-click="hide()">Cancel</button> </p></div></div>',
                            controller: ($scope, $modalInstance, avatar) => {
                                $scope.avatar = avatar;
                                $scope.hide = () => {
                                    $modalInstance.dismiss('cancel');
                                }
                                $scope.okModal = (file64) => {
                                    console.log(file64);
                                    $modalInstance.close(file64);
                                }
                            },
                            size: 'md',
                            resolve: {
                                avatar: function () {
                                    return $scope.avatar;
                                }
                            }
                        });

                        modalInstance.result.then(function (file64) {
                            console.log(file64);
                            $scope.avatar = file64;

                        }, function () {
                        });
                    }
                })
            })
        },

    }
}
