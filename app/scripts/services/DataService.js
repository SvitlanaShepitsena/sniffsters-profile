var DataService = (function () {
    function DataService($http, $q, $firebase) {
        this.$http = $http;
        this.$q = $q;
        this.$firebase = $firebase;
    }
    DataService.prototype.getProfile = function (id) {
        var key = id.replace(/\./g, '(p)');
        this.fb = this.$firebase(new Firebase("https://torid-fire-6526.firebaseio.com/breeders/" + key));
        this.fb.$on('value', function (snapshot) {
            var breeder = snapshot.snapshot.value;
            d.resolve(breeder);
        });

        var d = this.$q.defer();

        return d.promise;
    };

    DataService.prototype.updateProfile = function (t) {
        var d = this.$q.defer();

        var key = t.Email.replace(/\./g, '(p)');

        this.fb = this.$firebase(new Firebase("https://torid-fire-6526.firebaseio.com/breeders/"));
        this.fb[key] = t;
        this.fb.$save(key);
        d.resolve();
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
