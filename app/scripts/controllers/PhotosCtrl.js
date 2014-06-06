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

        $scope.photosCtrl = this;
        $scope.index.url = "photos";
        DataService.getGalleries().then(function (data) {
            _this.Galleries = data;
        }, function () {
            _this.ShowError('Error in getting Photo Galleries from the server');
        });
    }
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
