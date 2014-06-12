
var photoGallery = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/photo-gallery.html',
        replace: true,
        controller: function ($scope, DataService, $stateParams, $state) {
            $scope.tempPhoto = [];
            var index = 0;

            $scope.photosCtrl.SelectedGallery.Photos.forEach(function (photo) {
                $scope.tempPhoto.push(photo);
                $scope.photosCtrl.SelectedGallery.Photos.splice(index++, 1);
            });

            $scope.tempPhoto.forEach(function (photo) {
                $scope.photosCtrl.SelectedGallery.Photos.push(photo);
            });

            $scope.delGallery = function () {
                DataService.deleteGallery($scope.photosCtrl.SelectedGallery.Id).then(function () {
                    var id = $stateParams.id;
                    $scope.photosCtrl.Galleries.splice(id, 1);

                    $state.go('profile.photos2', {});
                });
            };
        },
        link: function (scope, element, attrs) {
        }
    };
};
