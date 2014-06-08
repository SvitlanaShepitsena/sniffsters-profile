
var photosInfo = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/photos-info.html',
        transclude: true,
        replace: true,
        controller: function ($scope, $stateParams, $upload, DataService, toastr) {
            $scope.newGallery = {};

            $scope.onFileSelect = function ($files) {
                for (var i = 0; i < $files.length; i++) {
                    var file = $files[i];

                    $scope.upload = $upload.upload({
                        url: 'http://localhost:44300/BreederPersonal/AddPictureNewGallery',
                        data: { Title: $scope.newGallery.Title },
                        file: file
                    }).progress(function (evt) {
                    }).success(function (data, status, headers, config) {
                        console.log(data);
                    });
                }
            };
        }
    };
};
