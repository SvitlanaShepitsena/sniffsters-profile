/// <reference path="../models/IBreederProfile.ts" />
class GalleryService {


   Gallery:IGallery;


    GetGalleryClone() {

        var dolly:IGallery = new Gallery();
        for (var key in this.Gallery) {
            if (this.Gallery.hasOwnProperty(key)) {
                dolly[key] = this.Gallery[key];
            }
        }
        return dolly;
    }

    SetGallery(gallery:IGallery) {

        this.Gallery = gallery;
    }
}