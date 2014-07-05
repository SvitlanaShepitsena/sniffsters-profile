/// <reference path="../models/IBreederProfile.ts" />
class GalleryActive {

    static filter(Galleries, isActive:Boolean):IGallery[] {

        var finalArray:IGallery[] = [];

        for (var key in Galleries) {
            var gallery = Galleries[key];

            if (gallery.IsActive === isActive) {
                finalArray.push(gallery);
            }

            return finalArray;
        }
    }
}
