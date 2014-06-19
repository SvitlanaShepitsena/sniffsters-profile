var GalleryActive = (function () {
    function GalleryActive() {
    }
    GalleryActive.filter = function (Galleries, isActive) {
        var finalArray = [];

        Galleries.forEach(function (gallery) {
            if (gallery.IsActive === isActive) {
                finalArray.push(gallery);
            }
        });
        return finalArray;
    };
    return GalleryActive;
})();
