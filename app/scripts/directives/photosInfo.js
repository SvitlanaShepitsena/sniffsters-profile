
var photosInfo = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/photos-info.html',
        transclude: true,
        replace: true,
        controller: function ($scope, $stateParams, $upload, DataService, toastr) {
            $scope.newGallery = {};
            $scope.files = [];
            var index = 0;
            $scope.save = function () {
                $scope.up($scope.files, 0);
            };
            $scope.onFileSelect = function ($files) {
                $scope.files = $files;
            };

            $scope.up = function ($files, index) {
                if (index == $files.length) {
                    return;
                }
                var file = $files[index];
                $upload.upload({
                    url: 'http://localhost:44300/BreederPersonal/AddPictureNewGallery',
                    data: { Title: $scope.newGallery.Title },
                    file: file
                }).progress(function (evt) {
                }).success(function (data, status, headers, config) {
                    $scope.up($files, index + 1);
                    console.log(data);
                });
            };
        }
    };
};
