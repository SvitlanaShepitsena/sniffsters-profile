/// <reference path="../models/IBreederProfile.ts" />
class GalleryActive {

    static filter(Galleries, isActive:Boolean):IGallery[] {

        var finalArray:IGallery[] = [];

        Galleries.forEach((gallery) => {

            if (gallery.IsActive === isActive) {
                finalArray.push(gallery);
            }
        })
        return finalArray;

    }
}
