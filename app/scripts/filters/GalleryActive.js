var GalleryActive = (function () {
    function GalleryActive() {
    }
    GalleryActive.filter = function (Galleries, isActive) {
        var finalArray = [];

        for (var key in Galleries) {
            var gallery = Galleries[key];

            if (gallery.IsActive === isActive) {
                finalArray.push(gallery);
            }

            return finalArray;
        }
    };
    return GalleryActive;
})();
//# sourceMappingURL=GalleryActive.js.map
