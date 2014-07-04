/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface ILitterNew extends ng.IScope {
    test:string;
}

var litterNew:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/litter-new.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            l: '=',
            userName: '@',
            text: '@',
            func: '&'
        },
        controller: ($scope, $q, DataService:DataService, $modal, $upload)=> {

            $scope.onNewFileSelect = ($files) => {
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
                    url: 'http://localhost:44300/BreederPersonal/AddPictureNewLitter',
                    data: {
                        Title: $scope.l.Title,
                        Puppies: $scope.l.Puppies,
                        Colors: $scope.l.Colors,
                        DateOfBirth: $scope.l.DateOfBirth

                    },
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
                    $scope.l.Photos.push(photo);
                    $scope.l.Id = data.GalleryId;
                    $scope.up($files, index + 1);
                });
            }

            $scope.deleteLitterPhoto = (litterId:number, photoId:number, index:number) => {

                var modalInstance = $modal.open({
                    template: "<div><div class=\"modal-body\">Delete this photo?</div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-click=\"ok()\">OK</button><button class=\"btn btn-warning\" ng-click=\"cancel()\">Cancel</button></div></div>",
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
                        DataService.deleteLitterPhoto(litterId, photoId).then(() => {
                            $scope.l.Photos.splice(index, 1);
                        });

                    }
                })
            }


            $scope.today = function () {
                $scope.dt = new Date();
            };
            $scope.today();

            $scope.clear = function () {
                $scope.dt = null;
            };


            $scope.open = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
            };


            $scope.initDate = new Date();
            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[2];
        },
        link: (scope:ILitterNew, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {


        }
    }
}
