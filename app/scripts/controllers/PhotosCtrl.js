// <reference path="HomeCtrl.ts" />
/// <reference path="../models/IBreederProfile.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/underscore/underscore.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase.d.ts" />
var PhotosCtrl = (function () {
    function PhotosCtrl($scope, $filter, $firebase, $stateParams, $state, settings) {
        var _this = this;
        this.$scope = $scope;
        this.$filter = $filter;
        this.$firebase = $firebase;
        this.$state = $state;
        $scope.home.menuIndex = 2;
        $scope.noGalleryNotice = settings.noGalleryNotice;

        $scope.$watch("photosCtrl.GalleriesNew", function () {
            for (var i = 0; i < _this.GalleriesNew.length; i++) {
                var gallery = _this.GalleriesNew[i];
                if (!(typeof (gallery.Title) != 'undefined' && gallery.Title.length < 250)) {
                    _this.$scope.isOk = true;
                    break;
                } else {
                    _this.$scope.isOk = false;
                }
            }
        }, true);

        var newGallery = new Gallery();
        this.GalleriesNew = new Array(newGallery);

        $scope.photosCtrl = this;
        $scope.home.url = "photos";

        this.$scope.home.auth.$getCurrentUser().then(function (user) {
            _this.$scope.home.Breedership(_this.$scope.home.FireProcess(user.email)).then(function () {
                var galleriesUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.FireProcess($stateParams.uname) + '/galleries';
                $scope.galleries = $firebase(new Firebase(galleriesUrl));
                $scope.newGalleries = [];
            });
        });
        $scope.onNewFileSelect = function ($files, galleryId) {
            var photos = $scope.galleries.$child(galleryId).$child('photos');
            console.log(galleryId);

            $files.forEach(function (file) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    var image = loadEvent.target.result;
                    photos.$add({
                        caption: 'picture1',
                        file64: image
                    });
                };
                reader.readAsDataURL(file);
            });
            photos.$save();
        };
    }
    PhotosCtrl.prototype.saveNewGalleries = function () {
        var _this = this;
        this.$scope.newGalleries.forEach(function (gallery, index) {
            if (gallery.Title === "") {
                gallery.Title = "New Gallery";
            }
            var galleryShort = _.omit(gallery, 'Photos');
            _this.$scope.galleries.$add(galleryShort).then(function (key) {
                gallery.Photos.forEach(function (photo) {
                    _this.$scope.galleries.$child(key.name()).$child('Photos').$add(_.omit(photo, 'isSized'));
                });
            });
        });
        this.$scope.newGalleries = [];
    };

    PhotosCtrl.prototype.cancelGalleries = function () {
        this.$scope.newGalleries = [];
    };

    PhotosCtrl.prototype.addGallery = function () {
        var gallery = new Gallery();
        gallery.Title = "New Gallery";
        gallery.isTemp = true;
        this.$scope.newGalleries.unshift(gallery);
    };
    return PhotosCtrl;
})();
