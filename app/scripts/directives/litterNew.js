// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../services/DataService.ts" />

var litterNew = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/litter-new.html',
        // replace directive tag with template info
        replace: true,
        controller: function ($scope, $firebase, $q, DataService, $modal, $upload) {
            $scope.l = {};
            $scope.tempPhotos = [];
            $scope.onNewFileSelect = function ($files) {
                //$files: an array of files selected, each file has name, size, and type.
                //                 var file = $files[0];
                $scope.up($files, 0);
            };
            $scope.up = function ($files, index) {
                if (index == $files.length) {
                    return;
                }
                var littersUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.userNameFire + '/litters/';
                var littersRef = $firebase(new Firebase(littersUrl));
                var litter = new Litter();
                litter.Title = $scope.l.Title;
                litter.DateOfBirth = $scope.l.DateOfBirth;
                litter.Puppies = $scope.l.Puppies;
                litter.Colors = $scope.l.Colors;
                litter.isTemp = true;

                littersRef.$add(litter).then(function (keyChild) {
                    var litterRef = $firebase(new Firebase(littersUrl + keyChild.name()));
                    var photosRef = litterRef.$child('photos');

                    $files.forEach(function (file) {
                        var reader = new FileReader();
                        reader.onload = function (loadEvent) {
                            var image = loadEvent.target.result;
                            $scope.tempPhotos.push(image);
                            photosRef.$add({
                                caption: 'picture1',
                                file64: image
                            });
                        };
                        reader.readAsDataURL(file);
                    });
                });

                console.log($scope.l);
                $files.forEach(function (file) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        $scope.fileFired = loadEvent.target.result;
                    };
                    reader.readAsDataURL(file);
                });
            };

            $scope.deleteLitterPhoto = function (litterId, photoId, index) {
                var modalInstance = $modal.open({
                    template: "<div><div class=\"modal-body\">Delete this photo?</div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-click=\"ok()\">OK</button><button class=\"btn btn-warning\" ng-click=\"cancel()\">Cancel</button></div></div>",
                    size: 'sm',
                    controller: function ($scope, $modalInstance) {
                        $scope.ok = function () {
                            $modalInstance.close(true);
                        };
                        $scope.cancel = function () {
                            $modalInstance.close(false);
                        };
                    }
                });

                modalInstance.result.then(function (confirmation) {
                    if (confirmation) {
                        DataService.deleteLitterPhoto(litterId, photoId).then(function () {
                            $scope.l.Photos.splice(index, 1);
                        });
                    }
                });
            };

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
        link: function (scope, element, attrs) {
        }
    };
};
