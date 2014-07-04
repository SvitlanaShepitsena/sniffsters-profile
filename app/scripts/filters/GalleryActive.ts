/// <reference path="../models/IBreederProfile.ts" />
class GalleryActive {

    static filter(Galleries:IGallery[], isActive:Boolean):IGallery[] {

        var finalArray:IGallery[] = [];

        Galleries.forEach((gallery:IGallery) => {
            if (gallery.IsActive === isActive) {
                finalArray.push(gallery);
            }
        })
        return finalArray;
    }
}
