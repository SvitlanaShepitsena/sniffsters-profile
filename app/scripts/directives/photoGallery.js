
var photoGallery = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/photo-gallery.html',
        replace: true,
        controller: function ($scope, DataService, $stateParams, $state) {
            $scope.delGallery = function () {
                DataService.deleteGallery($scope.photosCtrl.SelectedGallery.Id).then(function () {
                    var id = $stateParams.id;
                    $scope.photosCtrl.Galleries.splice(id, 1);

                    $state.go('profile.photos', {});
                });
            };
        },
        link: function (scope, element, attrs) {
        }
    };
};
