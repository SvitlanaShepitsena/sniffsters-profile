/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface IPhotoGalleryEdit extends ng.IScope {
    test:string;
}

var photoGalleryEdit:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/photo-gallery-edit.html',
        // replace directive tag with template info
        replace: true,

        controller: ($scope, $stateParams, $upload, $modal, DataService:DataService, toastr:Toastr) => {
            $scope.photosCtrl.CreateSelectedGalleryClone();

            $scope.tempPhoto = [];
            var index = 0;
            //iterating over arrey of photos of selected gallery
            $scope.photosCtrl.SelectedGalleryEdit.Photos.forEach((photo) => {
                //move photo from main ctrl to temp empty arrey
                $scope.tempPhoto.push(photo);
                $scope.photosCtrl.SelectedGalleryEdit.Photos.splice(index++, 1);
            });

            $scope.tempPhoto.forEach((photo) => {
                $scope.photosCtrl.SelectedGalleryEdit.Photos.push(photo);
            })


            var index:number = $stateParams.id;

            $scope.delete = (p:IPhoto, index:number) => {
                var modalInstance = $modal.open({
                    templateUrl: 'myModalContent.html',
                    size: 'sm',
                    controller: ($scope, $modalInstance) => {
                        $scope.ok = () => {
                            $modalInstance.close(true)
                        }

                        $scope.cancel = () => {
                            $modalInstance.close(false)
                        }
                    }

                });
                modalInstance.result.then((confirmation:boolean) => {
                    if (confirmation) {
                        DataService.deletePhoto($scope.photosCtrl.SelectedGallery.Id, p.Id).then(() => {
                            $scope.photosCtrl.SelectedGallery.Photos.splice(index, 1);
                        });

                    }
                })
            }


            $scope.update = (p:IPhoto) => {
                DataService.updateCaption($scope.photosCtrl.SelectedGallery.Id, p.Id, p.Caption).then(() => {
                    toastr.success('Changes have been successfully saved to Db');
                })
            }


            $scope.updateTitle = (newTitle:string) => {
                DataService.updateTitle($scope.photosCtrl.SelectedGallery.Id, newTitle).then(() => {
                    toastr.success('Changes have been successfully saved to Db');
                });
            }

            $scope.onFileSelect = ($files) => {
                //$files: an array of files selected, each file has name, size, and type.
                for (var i = 0; i < $files.length; i++) {
                    var file = $files[i];

                    $scope.upload = $upload.upload({
                        url: 'http://localhost:44300/BreederPersonal/AddPicture',
                        // method: 'POST' or 'PUT',
                        // headers: {'header-key': 'header-value'},
                        // withCredentials: true,
                        data: {gallery: $scope.photosCtrl.SelectedGallery.Id },
                        file: file // or list of files: $files for html5 only
                        /* set the file formData name ('Content-Desposition'). Default is 'file' */
                        //fileFormDataName: myFile, //or a list of names for multiple files (html5).
                        /* customize how data is added to formData. See #40#issuecomment-28612000 for sample code */
                        //formDataAppender: function(formData, key, val){}
                    }).progress((evt) => {
//                        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    }).success((data, status, headers, config) => {
                        // file is uploaded successfully
                        $scope.photosCtrl.SelectedGallery.Photos.push(data);
//                        $scope.myModelObj = {};
//                        alert(data);
                    });
                    //.error(...)
                    //.then(success, error, progress);
                    //.xhr(function(xhr){xhr.upload.addEventListener(...)})// access and attach any event listener to XMLHttpRequest.
                }
            }
        }
    }
}



