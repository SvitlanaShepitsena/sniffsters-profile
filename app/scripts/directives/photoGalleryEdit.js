
var photoGalleryEdit = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/photo-gallery-edit.html',
        transclude: true,
        replace: true,
        scope: {
            galleries: '=',
            id: '@',
            func: '&'
        },
        controller: function ($scope, $stateParams, $upload) {
            var index = $stateParams.id;
            $scope.index = index;

            $scope.onFileSelect = function ($files) {
                for (var i = 0; i < $files.length; i++) {
                    var file = $files[i];
                    console.log(file);
                    $scope.upload = $upload.upload({
                        url: 'http://localhost:44300/BreederPersonal/AddPicture',
                        data: { gallery: $scope.galleries[$scope.index].Id },
                        file: file
                    }).progress(function (evt) {
                    }).success(function (data, status, headers, config) {
                        $scope.galleries[$scope.index].Photos.push({
                            Caption: 'Picture',
                            FilePath: file.name
                        });
                    });
                }
            };
        }
    };
};
