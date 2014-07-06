var DataService = (function () {
    function DataService($http, $q, $firebase, underscore) {
        this.$http = $http;
        this.$q = $q;
        this.$firebase = $firebase;
        this.underscore = underscore;
    }

    DataService.prototype.getProfile = function (id) {
        var key = id.replace(/\./g, '(p)');
        this.fb = this.$firebase(new Firebase("https://torid-fire-6526.firebaseio.com/breeders/" + key + "/profile"));
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
        this.fb[key] = { profile: t };
        this.fb.$save(key);
        d.resolve();
        return d.promise;
    };

    DataService.prototype.getGalleries = function (id) {
        var key = id.replace(/\./g, '(p)');
        var fireGalleries = this.$firebase(new Firebase("https://torid-fire-6526.firebaseio.com/breeders/" + key + "/galleries"));

        fireGalleries.$on('value', function (snapshot) {
            var galleries = snapshot.snapshot.value;
            d.resolve(galleries);
        });
        var d = this.$q.defer();

        return d.promise;
    };

    DataService.prototype.getLitters = function (userName) {
        var d = this.$q.defer();

        var fireLitters = this.$firebase(new Firebase("https://torid-fire-6526.firebaseio.com/breeders/" + userName + "/litters"));

        fireLitters.$on('value', function (snapshot) {
            var litters = snapshot.snapshot.value;
            d.resolve(litters);
        });
        return d.promise;
    };

    DataService.prototype.getFeedbacks = function (userName) {
        var d = this.$q.defer();

        var fireLitters = this.$firebase(new Firebase("https://torid-fire-6526.firebaseio.com/breeders/" + userName + "/feedbacks"));

        fireLitters.$on('value', function (snapshot) {
            var feedbacks = snapshot.snapshot.value;
            d.resolve(feedbacks);
        });
        return d.promise;
    };

    DataService.prototype.deletePhoto = function (galleryId, photoId, userName) {
        var d = this.$q.defer();
        var fireGalleriesPhotos = this.$firebase(new Firebase("https://torid-fire-6526.firebaseio.com/breeders/" + userName + "/galleries/" + galleryId + "/Photos/" + photoId));

        fireGalleriesPhotos.$remove().then(function () {
            d.resolve();
        });

        return d.promise;
    };

    DataService.prototype.saveNewLitters = function (userName, litters) {
        var d = this.$q.defer();
        var fireLitters = this.$firebase(new Firebase("https://torid-fire-6526.firebaseio.com/breeders/" + userName + "/litters"));
        var keys = fireLitters.$getIndex();
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

    DataService.prototype.updateTitle = function (galleryId, title, userName) {
        var d = this.$q.defer();

        var fireGallery = this.$firebase(new Firebase("https://torid-fire-6526.firebaseio.com/breeders/" + userName + "/galleries/" + galleryId));
        console.log(fireGallery);
        fireGallery.$update({ Title: title }).then(function () {
            d.resolve();
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
