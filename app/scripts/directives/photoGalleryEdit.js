
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
                    $scope.upload = $upload.upload({
                        url: 'http://localhost:44300/BreederPersonal/AddPicture',
                        data: { myObj: $scope.myModelObj },
                        file: file
                    }).progress(function (evt) {
                        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    }).success(function (data, status, headers, config) {
                        console.log(data);
                    });
                }
            };
        }
    };
};
