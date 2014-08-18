/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/underscore/underscore.d.ts" />

var cover:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/cover.html',
        // replace directive tag with template info
        replace: true,

        controller: ($scope, $firebase, $filter, $modal, $stateParams) => {

            $scope.profileModal = $modal({
                scope: $scope,
                template: '../views/modals/profile-picture.html',
                animation: 'am-fade-and-scale',
                placement: 'center',
                show: false
            });

            $scope.showProfile = () => {
                $scope.profileModal.$promise.then($scope.profileModal.show);
            }

            $scope.showChangeBtn = false;
            $scope.files = [];

            $scope.chgBtnShown = () => {
                $scope.showChangeBtn = true;
            }
            $scope.chgBtnHidden = () => {
                $scope.showChangeBtn = false;
            }

            $scope.showChangeCoverBtn = false;

            $scope.chgCoverBtnShown = () => {
                $scope.showChangeCoverBtn = true;
            }
            $scope.chgCoverBtnHidden = () => {
                $scope.showChangeCoverBtn = false;
            }

            $scope.show64 = () => {
                console.log('test12');
            }


            var requestEmail = $stateParams.uname;


            var profilePicUrl = $scope.home.MainUrl;
            profilePicUrl += $scope.home.FireProcess(requestEmail) + 'breeders/profile/images/avatar';

            $scope.avatar = $firebase(new Firebase(profilePicUrl));

            $scope.avatar.$on('value', (snapshot:any)=> {
                $scope.isAvatarChanged = !_.isEmpty(snapshot.snapshot.value);
                $scope.avatarsrc = _.values(snapshot.snapshot.value)[0];
            });

            var coverPicUrl = $scope.home.MainUrl;
            coverPicUrl += 'breeders/' + 'profile/';
            coverPicUrl += $scope.home.FireProcess(requestEmail) + '/images/cover';

            $scope.cover = $firebase(new Firebase(coverPicUrl));

            $scope.cover.$on('value', (snapshot:any)=> {
                $scope.isCoverChanged = !_.isEmpty(snapshot.snapshot.value);
                $scope.coversrc = _.values(snapshot.snapshot.value)[0];
            });

        }
    }
}
