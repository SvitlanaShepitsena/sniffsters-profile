/// <reference path="HomeCtrl.ts" />
/// <reference path="../models/IBreederProfile.ts" />
var PhotosCtrl = (function () {
    function PhotosCtrl($scope, $filter, $firebase, $state, toastr, DataService, CopyProfileService) {
        var _this = this;
        this.$scope = $scope;
        this.$filter = $filter;
        this.$firebase = $firebase;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        this.CopyProfileService = CopyProfileService;
        $scope.home.menuIndex = 2;

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
                var galleriesUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.FireProcess(user.email) + '/galleries';
                $scope.galleries = $firebase(new Firebase(galleriesUrl));
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
            //$files: an array of files selected, each file has name, size, and type.
            //                 var file = $files[0];
            //            $scope.up($files, 0);
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

            $files.forEach(function (file) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    $scope.fileFired = loadEvent.target.result;
                };
                reader.readAsDataURL(file);
            });
        };
    }

    PhotosCtrl.prototype.saveNewGalleries = function () {
        var unshared = this.$filter('orderByPriority')(this.$scope.galleries);
        unshared.forEach(function (gallery) {
            gallery.isTemp = false;
        });
    };

    PhotosCtrl.prototype.updateGallery = function (galleries, index) {
        var _this = this;
        if (galleries.length == 0) {
            if (this.GalleriesNew.length == 0) {
                this.GalleriesNew.push(new Gallery());
            }
            return;
        }
        var gallery = galleries[index];

        this.DataService.updateGallery(gallery).then(function () {
            _this.GalleriesNew.splice(index, 1);
            _this.Galleries.push(gallery);

            _this.updateGallery(galleries, index);
        });
    };

    PhotosCtrl.prototype.addGallery = function () {
        var gallery = new Gallery();
        gallery.Title = "";
        gallery.isTemp = true;
        this.$scope.galleries.$add(gallery);
    };

    PhotosCtrl.prototype.setSelectedGallery = function (galleryId) {
        this.SelectedGallery = this.Galleries[galleryId];
        this.$state.go('profile.photos2.galleries', { 'id': galleryId });
        //        console.log(this.SelectedGallery);
    };

    PhotosCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    PhotosCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };

    PhotosCtrl.prototype.CreateSelectedGalleryClone = function () {
        this.SelectedGalleryEdit = new Gallery();
        for (var key in this.SelectedGallery) {
            if (this.SelectedGallery.hasOwnProperty(key)) {
                this.SelectedGalleryEdit[key] = this.SelectedGallery[key];
            }
        }
        //        console.log(this.SelectedGalleryEdit);
        //        console.log(this.SelectedGallery);
        //        return dolly;
    };
    return PhotosCtrl;
})();
