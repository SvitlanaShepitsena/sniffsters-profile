/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface IPhotosInfo extends ng.IScope {
    test:string;
    ctrl:IndexCtrl;
    pnumbers:number;
}

var photosInfo:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/photos-info.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            userName: '@',
            newGallery: '='
        },

        controller: ($scope, $q, $stateParams, $state, $upload, DataService:DataService, toastr:Toastr) => {
            var index = 0;
            $scope.newGallery.Photos = [];

            $scope.delete = (p:IPhoto, index:number) => {
                DataService.deletePhoto($scope.newGallery.Id, p.Id).then(() => {
                    $scope.newGallery.Photos.splice(index, 1);
                })
            }
            $scope.onFileSelect = ($files) => {
                //$files: an array of files selected, each file has name, size, and type.
//                 var file = $files[0];
                $scope.up($files, 0);
//                $scope.up($files, 0);
            }
            $scope.up = ($files, index) => {
                if (index == $files.length) {
                    return;
                }
                var file = $files[index];
                $upload.upload({
                    url: 'http://localhost:44300/BreederPersonal/AddPictureNewGallery',
                    data: {Title: $scope.newGallery.Title},
                    file: file // or list of files: $files for html5 only
                }).progress((evt) => {
//                        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                }).success((data, status, headers, config) => {
//                    console.log(data);
                    var photo:IPhoto = {
                        Id: data.PhotoId,
                        Caption: 'Picture',
                        FilePath: data.FileName
                    }
                    $scope.newGallery.Photos.push(photo);
                    $scope.newGallery.Id = data.GalleryId;
                    $scope.up($files, index + 1);
                });
            }
        }
    }
}
