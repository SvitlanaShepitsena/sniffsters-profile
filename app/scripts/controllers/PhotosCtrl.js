var PhotosCtrl = (function () {
    function PhotosCtrl($scope, $state, toastr, DataService, CopyProfileService) {
        var _this = this;
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        this.CopyProfileService = CopyProfileService;
        var newGallery = new Gallery();
        this.GalleriesNew = new Array(newGallery);

        $scope.index.menuIndex = 2;
        $scope.photosCtrl = this;

        $scope.index.url = "photos";
        $scope.index.spinner = true;
        DataService.getGalleries().then(function (data) {
            _this.Galleries = data;
        }, function () {
            _this.ShowError('Error in getting Photo Galleries from the server');
        }).finally(function () {
            $scope.index.spinner = false;
        });
    }
    PhotosCtrl.prototype.saveNewGalleries = function () {
        var index = 0;
        this.updateGallery(this.GalleriesNew, index);
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
        this.GalleriesNew.push(new Gallery());
    };

    PhotosCtrl.prototype.setSelectedGallery = function (galid) {
        this.SelectedGallery = this.Galleries[galid];
        this.$state.go('profile.photos.galleries', { 'id': galid });
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
    };
    return PhotosCtrl;
})();
