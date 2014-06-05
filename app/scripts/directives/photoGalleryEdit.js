
var photoGalleryEdit = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/photo-gallery-edit.html',
        transclude: true,
        replace: true,
        controller: function ($scope, $stateParams, $upload, DataService, toastr) {
            var index = $stateParams.id;
            $scope.index = index;

            $scope.delete = function (p, index) {
                DataService.deletePhoto($scope.galleries[$scope.index].Id, p.Id).then(function () {
                    $scope.galleries[$scope.index].Photos.splice(index, 1);
                });
            };
            $scope.update = function (p) {
                DataService.updateCaption($scope.galleries[$scope.index].Id, p.Id, p.Caption).then(function () {
                    toastr.success('Changes have been successfully saved to Db');
                });
            };

            $scope.updateTitle = function (newTitle) {
                DataService.updateTitle($scope.galleries[$scope.index].Id, newTitle).then(function () {
                    toastr.success('Changes have been successfully saved to Db');
                });
            };

            $scope.onFileSelect = function ($files) {
                for (var i = 0; i < $files.length; i++) {
                    var file = $files[i];

                    $scope.upload = $upload.upload({
                        url: 'http://localhost:44300/BreederPersonal/AddPicture',
                        data: { gallery: $scope.galleries[$scope.index].Id },
                        file: file
                    }).progress(function (evt) {
                    }).success(function (data, status, headers, config) {
                        $scope.galleries[$scope.index].Photos.push(data);
                    });
                }
            };
        }
    };
};
