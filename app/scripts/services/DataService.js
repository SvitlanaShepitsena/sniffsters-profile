var DataService = (function () {
    function DataService($http, $q) {
        this.$http = $http;
        this.$q = $q;
    }
    DataService.prototype.getProfile = function (id) {
        var d = this.$q.defer();
        var b = new BreederProfile();
        b.Email = "breeder1@gmail.com";
        b.FirstName = "Boris";
        b.LastName = "Oberman";
        b.KennelName = "Boris Oberman";
        b.AddInfo = "It may seem that finding a reputable breeder is a simple task, but we live in a world where the owners of all these operations can and do call themselves “breeders”:";
        d.resolve(b);
        b.Story = "Right on time at 12:00, the gas emitters engaged and spread a minimal quantity of the new neuro-depressant around the school building. The effect was not noticeable at first. After lunch, all the students were in the gymnasium for a pep-assembly for th e home-coming game that weekend. At 12:45, 9 people entered the school. They entered the school office. When asked by the secretary what she could do for them, they requested that she ask all the people in the office to come to the front. When all wer e assembled, they were told that no matter what they should see or hear, that it was all normal, and they should just go on about their normal business routines and forget that they were ever there. Due to the gas, they returned to their work and never g ave anything else a second thought. ";
        b.Parents = "Erin had been watching the football team get fired up from the speeches. When the men had come in, she just assumed it was part of the show. They sounded so sincere. When told to follow Mr. Smith, she went right along. Out the gym. Out the back of t he school. Out to where a big truck was parked. There were men there helping girls up and into the two big boxes on the trailer. ";
        b.Boys = "3 Boys";
        b.Girls = "3 Girls";
        b.Location = "Chicago,IL";
        b.Website = "www.bestdogs.com";
        b.Phone = "773-123-45-67";
        b.Certifications = [];

        return d.promise;
    };

    DataService.prototype.getLitters = function () {
        var d = this.$q.defer();

        var litters = [];
        litters.push(new Litter());
        d.resolve(litters);

        return d.promise;
    };

    DataService.prototype.getFeedbacks = function () {
        var d = this.$q.defer();

        var feedbacks = [];
        feedbacks.push(new Feedback());

        d.resolve(feedbacks);

        return d.promise;
    };

    DataService.prototype.updateProfile = function (t) {
        var d = this.$q.defer();

        this.$http.post('http://localhost:44300/BreederPersonal/UpdateUserProfile', { BreederViewModel: t }).success(function () {
            d.resolve();
        }).error(function (data, error) {
            d.reject();
        });
        return d.promise;
    };

    DataService.prototype.deletePhoto = function (galleryId, photoId) {
        var d = this.$q.defer();

        this.$http.post('http://localhost:44300/BreederPersonal/DeletePhoto', { deletePhoto: {
                GalleryId: galleryId,
                PhotoId: photoId
            } }).success(function () {
            d.resolve();
        }).error(function () {
            d.reject();
        });
        return d.promise;
    };

    DataService.prototype.saveNewLitters = function (litters) {
        var d = this.$q.defer();

        this.$http.post('http://localhost:44300/BreederPersonal/SaveNewLitters', {
            litters: litters
        }).success(function () {
            d.resolve();
        }).error(function () {
            d.reject();
        });
        return d.promise;
    };

    DataService.prototype.saveNewTestimonials = function (feedbacks) {
        var d = this.$q.defer();
        console.log(feedbacks);
        this.$http.post('http://localhost:44300/BreederPersonal/SaveNewFeedbacks', {
            feedbacks: feedbacks
        }).success(function (result) {
            d.resolve(result);
        }).error(function () {
            d.reject();
        });
        return d.promise;
    };

    DataService.prototype.deleteLitterPhoto = function (galleryId, photoId) {
        var d = this.$q.defer();

        this.$http.post('http://localhost:44300/BreederPersonal/DeleteLitterPhoto', { deletePhoto: {
                GalleryId: galleryId,
                PhotoId: photoId
            } }).success(function () {
            d.resolve();
        }).error(function () {
            d.reject();
        });
        return d.promise;
    };

    DataService.prototype.updateCaption = function (galleryId, photoId, caption) {
        var d = this.$q.defer();

        this.$http.post('http://localhost:44300/BreederPersonal/UpdateCaption', { photoCaption: {
                GalleryId: galleryId,
                PhotoId: photoId,
                Caption: caption
            } }).success(function () {
            d.resolve();
        }).error(function () {
            d.reject();
        });
        return d.promise;
    };

    DataService.prototype.updateTitle = function (galleryId, title) {
        var d = this.$q.defer();

        this.$http.post('http://localhost:44300/BreederPersonal/UpdateTitle', { galleryTitle: {
                GalleryId: galleryId,
                Title: title
            } }).success(function () {
            d.resolve();
        }).error(function () {
            d.reject();
        });
        return d.promise;
    };

    DataService.prototype.deleteGallery = function (galleryId) {
        var d = this.$q.defer();

        this.$http.post('http://localhost:44300/BreederPersonal/DeleteGallery', {
            galleryId: galleryId
        }).success(function () {
            d.resolve();
        }).error(function () {
            d.reject();
        });
        return d.promise;
    };

    DataService.prototype.shareGallery = function (galleryId) {
        var d = this.$q.defer();

        this.$http.post('http://localhost:44300/BreederPersonal/ShareGallery', {
            galleryId: galleryId
        }).success(function () {
            d.resolve();
        }).error(function () {
            d.reject();
        });
        return d.promise;
    };

    DataService.prototype.updateGallery = function (gallery) {
        var d = this.$q.defer();

        this.$http.post('http://localhost:44300/BreederPersonal/UpdateGallery', {
            gallery: gallery
        }).success(function () {
            d.resolve();
        }).error(function () {
            d.reject();
        });
        return d.promise;
    };

    DataService.prototype.convertNewGalleries = function (galleries) {
        var d = this.$q.defer();

        this.$http.post('http://localhost:44300/BreederPersonal/ConvertNewGalleries', {
            galleries: galleries
        }).success(function () {
            d.resolve();
        }).error(function () {
            d.reject();
        });
        return d.promise;
    };

    DataService.prototype.updateLitter = function (litter) {
        var d = this.$q.defer();

        this.$http.post('http://localhost:44300/BreederPersonal/SaveLitter', {
            litter: litter
        }).success(function () {
            d.resolve();
        }).error(function () {
            d.reject();
        });
        return d.promise;
    };

    DataService.prototype.updateFeedback = function (feedback) {
        var d = this.$q.defer();

        this.$http.post('http://localhost:44300/BreederPersonal/UpdateFeedback', {
            feedback: feedback
        }).success(function () {
            d.resolve();
        }).error(function () {
            d.reject();
        });
        return d.promise;
    };

    DataService.prototype.deleteLitter = function (id) {
        var d = this.$q.defer();

        this.$http.post('http://localhost:44300/BreederPersonal/DeleteLitter', {
            litterId: id
        }).success(function () {
            d.resolve();
        }).error(function () {
            d.reject();
        });
        return d.promise;
    };

    DataService.prototype.deleteFeedback = function (id) {
        var d = this.$q.defer();

        d.resolve();

        return d.promise;
    };

    DataService.prototype.getGalleries = function () {
        var d = this.$q.defer();
        var galleries = [];

        var gallery1 = new Gallery();
        gallery1.Title = "Gallery1";
        gallery1.Id = 3;
        gallery1.IsActive = true;
        gallery1.Photos = [new Photo()];
        galleries.push(gallery1);

        d.resolve(galleries);

        return d.promise;
    };

    DataService.prototype.updateGalleries = function (t) {
        var d = this.$q.defer();

        this.$http.post('http://localhost:44300/BreederPersonal/UpdateGalleries', { Galleries: t }).success(function () {
            d.resolve();
        }).error(function (data, error) {
            d.reject();
        });
        return d.promise;
    };
    return DataService;
})();
