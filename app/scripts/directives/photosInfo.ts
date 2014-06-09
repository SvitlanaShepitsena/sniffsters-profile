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
            userName:'@'

        },

        controller: ($scope, $q, $stateParams, $state, $upload, DataService:DataService, toastr:Toastr) => {
            $scope.Photos = [];
            $scope.GalleryId;
            $scope.newGallery = {};

            $scope.files = [];
            $scope.photoData = [];
            var index = 0;

            $scope.delete = (p:IPhoto, index:number) => {
                DataService.deletePhoto($scope.GalleryId, p.Id).then(() => {
                    $scope.Photos.splice(index, 1);
                })
            }
            $scope.update = (p:IPhoto) => {
                DataService.updateCaption($scope.GalleryId, p.Id, p.Caption).then(() => {
                    toastr.success('Changes have been successfully saved to Db');
                })
            }


            $scope.updateTitle=() => {
                DataService.updateTitle($scope.GalleryId, $scope.newGallery.Title).then(() => {
                    toastr.success('Changes have been successfully saved to Db');
                });
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
                    $scope.GalleryId=data.GalleryId;
                    $scope.Photos.push(photo);
                    $scope.up($files, index + 1);

                });
            }

        }
    }
}
