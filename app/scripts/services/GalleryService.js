var GalleryService = (function () {
    function GalleryService() {
    }

    GalleryService.prototype.GetGalleryClone = function () {
        var dolly = new Gallery();
        for (var key in this.Gallery) {
            if (this.Gallery.hasOwnProperty(key)) {
                dolly[key] = this.Gallery[key];
            }
        }
        return dolly;
    };

    GalleryService.prototype.SetGallery = function (gallery) {
        this.Gallery = gallery;
    };
    return GalleryService;
})();
