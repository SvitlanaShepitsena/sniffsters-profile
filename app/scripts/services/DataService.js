/// <reference path="../../bower_components/DefinitelyTyped/underscore/underscore.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angularfire/angularfire.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../models/IBreederProfile.ts" />
var DataService = (function () {
    function DataService($http, $q, $firebase, settings, $filter) {
        this.$http = $http;
        this.$q = $q;
        this.$firebase = $firebase;
        this.settings = settings;
        this.$filter = $filter;
        this.url = settings.mainUrl;
        this.urlLooker = this.url + "lookers/";
    }
    // =Messages
    DataService.prototype.sendReply = function (userName, corrUserName, reply) {
        userName = this.FireProcess(userName);
        corrUserName = this.FireProcess(corrUserName);

        var d = this.$q.defer();
        var corrUserUrl = this.url + userName + "/messages";
        var corrUserRef = this.$firebase(new Firebase(corrUserUrl));

        var note = new Note();
        note.amISender = true;
        note.sent = Date.now();
        note.body = reply;

        note.isTrash = false;
        note.userName = corrUserName;
        corrUserRef.$add(note);

        d.resolve();

        return d.promise;
    };

    DataService.prototype.sendLookerReply = function (userName, corrUserName, reply) {
        userName = this.FireProcess(userName);
        corrUserName = this.FireProcess(corrUserName);

        var d = this.$q.defer();

        var corrUserUrl = this.urlLooker + userName + "/messages";
        var corrUserRef = this.$firebase(new Firebase(corrUserUrl));

        var note = new Note();
        note.amISender = true;
        note.sent = Date.now();
        note.body = reply;

        note.isTrash = false;
        note.userName = corrUserName;
        corrUserRef.$add(note);

        d.resolve();

        return d.promise;
    };

    DataService.prototype.deleteConversation = function (userName, corrUserName) {
        userName = this.FireProcess(userName);
        corrUserName = this.FireProcess(corrUserName);

        var d = this.$q.defer();
        var messagesUrl = this.url + userName + "/messages";
        var notesRef = this.$firebase(new Firebase(messagesUrl));

        var keys = notesRef.$getIndex();
        var allNotes = [];
        keys.forEach(function (key) {
            allNotes.push(notesRef[key]);
        });
        var notes = _.where(allNotes, { isTrash: false, userName: corrUserName });

        notes.forEach(function (note) {
            note.isTrash = true;
        });
        notesRef.$save();
        d.resolve();

        return d.promise;
    };

    DataService.prototype.recoverConversation = function (userName, corrUserName) {
        userName = this.FireProcess(userName);
        corrUserName = this.FireProcess(corrUserName);

        var d = this.$q.defer();
        var messagesUrl = this.url + userName + "/messages";
        var notesRef = this.$firebase(new Firebase(messagesUrl));

        var keys = notesRef.$getIndex();
        var allNotes = [];
        keys.forEach(function (key) {
            allNotes.push(notesRef[key]);
        });
        var notes = _.where(allNotes, { isTrash: true, userName: corrUserName });

        notes.forEach(function (note) {
            note.isTrash = false;
        });
        notesRef.$save();
        d.resolve();

        return d.promise;
    };

    DataService.prototype.deleteForever = function (userName, corrUserName) {
        userName = this.FireProcess(userName);
        corrUserName = this.FireProcess(corrUserName);

        var d = this.$q.defer();
        var messagesUrl = this.url + userName + "/messages";
        var notesRef = this.$firebase(new Firebase(messagesUrl));

        var keys = notesRef.$getIndex();
        keys.forEach(function (key) {
            var value = notesRef[key];
            if (value.isTrash === true && value.userName === corrUserName) {
                notesRef.$remove(key);
            }
        });

        notesRef.$save();
        d.resolve();

        return d.promise;
    };

    DataService.prototype.getLookerMessages = function (userName) {
        var _this = this;
        userName = this.FireProcess(userName);
        var d = this.$q.defer();
        var fireMessages = this.$firebase(new Firebase(this.url + "lookers/" + userName + "/messages"));

        fireMessages.$on('value', function (snapshot) {
            var messages = snapshot.snapshot.value;

            d.resolve(_this.$filter('orderByPriority')(messages));
        });
        return d.promise;
    };

    DataService.prototype.getMessages = function (userName) {
        var _this = this;
        userName = this.FireProcess(userName);
        var d = this.$q.defer();

        var fireMessages = this.$firebase(new Firebase(this.url + "breeders/" + userName + "/messages"));

        fireMessages.$on('value', function (snapshot) {
            var messages = snapshot.snapshot.value;

            d.resolve(_this.$filter('orderByPriority')(messages));
        });
        return d.promise;
    };

    DataService.prototype.FireProcess = function (userName) {
        return userName.replace(/\./g, '(p)');
    };

    DataService.prototype.FireUnProcess = function (userName) {
        return userName.replace(/\(p\)/g, '.');
    };

    // =Followeings
    DataService.prototype.getMyLookerFollowings = function (userName) {
        var _this = this;
        userName = this.FireProcess(userName);

        var d = this.$q.defer();

        var followingsUrl = this.url + "lookers/" + userName + "/followings";
        var followingsRef = this.$firebase(new Firebase(followingsUrl));

        followingsRef.$on('value', function (snapshot) {
            var followings = snapshot.snapshot.value;
            var followingssArr = _.map(_.keys(followings), function (value) {
                return _this.FireUnProcess(value);
            });

            d.resolve(followingssArr);
        });
        return d.promise;
    };

    DataService.prototype.getMyFollowings = function (userName) {
        var _this = this;
        userName = this.FireProcess(userName);

        var d = this.$q.defer();

        var followingsUrl = this.url + "breeders/" + userName + "/followings";
        var followingsRef = this.$firebase(new Firebase(followingsUrl));

        followingsRef.$on('value', function (snapshot) {
            var followings = snapshot.snapshot.value;
            var followingssArr = _.map(_.keys(followings), function (value) {
                return _this.FireUnProcess(value);
            });

            d.resolve(followingssArr);
        });
        return d.promise;
    };

    DataService.prototype.getMyFollowers = function (userName) {
        var _this = this;
        userName = this.FireProcess(userName);

        var d = this.$q.defer();

        var followersUrl = this.url + "breeders/" + userName + "/followers";
        var followersRef = this.$firebase(new Firebase(followersUrl));

        followersRef.$on('value', function (snapshot) {
            var followers = snapshot.snapshot.value;
            var followersArr = _.map(_.keys(followers), function (value) {
                return _this.FireUnProcess(value);
            });

            d.resolve(followersArr);
        });
        return d.promise;
    };

    DataService.prototype.followLookerUser = function (userName, followerName) {
        userName = this.FireProcess(userName);
        followerName = this.FireProcess(followerName);
        var d = this.$q.defer();

        var followingsUrl = this.url + "lookers/" + userName + "/followings";
        var followingsRef = this.$firebase(new Firebase(followingsUrl));

        var followingRef = followingsRef.$child(followerName);
        followingRef.$add(1);

        followingsRef.$save();

        d.resolve();
        return d.promise;
    };

    DataService.prototype.followUser = function (userName, followerName) {
        userName = this.FireProcess(userName);
        followerName = this.FireProcess(followerName);
        var d = this.$q.defer();

        var followingsUrl = this.url + "breeders/" + userName + "/followings";
        var followingsRef = this.$firebase(new Firebase(followingsUrl));

        var followingRef = followingsRef.$child(followerName);
        followingRef.$add(1);

        followingsRef.$save();

        var followersUrl = this.url + "breeders/" + followerName + "/followers";
        var followersRef = this.$firebase(new Firebase(followersUrl));

        var followerRef = followersRef.$child(userName);
        followerRef.$add(1);

        followersRef.$save();

        d.resolve();
        return d.promise;
    };

    DataService.prototype.unFollowLookerUser = function (userName, followerName) {
        userName = this.FireProcess(userName);
        followerName = this.FireProcess(followerName);
        var d = this.$q.defer();

        var followingUrl = this.url + "lookers/" + userName + "/followings/" + followerName;
        var followingRef = this.$firebase(new Firebase(followingUrl));

        followingRef.$remove();
        followingRef.$save();

        d.resolve();
        return d.promise;
    };

    DataService.prototype.unFollowUser = function (userName, followerName) {
        userName = this.FireProcess(userName);
        followerName = this.FireProcess(followerName);
        var d = this.$q.defer();

        var followingUrl = this.url + "breeders/" + userName + "/followings/" + followerName;
        var followingRef = this.$firebase(new Firebase(followingUrl));

        followingRef.$remove();
        followingRef.$save();

        var followerUrl = this.url + "breeders/" + followerName + "/followers/" + userName;
        var followerRef = this.$firebase(new Firebase(followerUrl));

        followerRef.$remove();
        followerRef.$save();

        d.resolve();
        return d.promise;
    };

    //=Profile
    DataService.prototype.getProfile = function (id) {
        var key = id.replace(/\./g, '(p)');
        this.fb = this.$firebase(new Firebase(this.url + "breeders/" + key + "/profile"));
        this.fb.$on('value', function (snapshot) {
            var breeder = snapshot.snapshot.value;
            d.resolve(breeder);
        });
        var d = this.$q.defer();

        return d.promise;
    };

    DataService.prototype.getAllProfiles = function () {
        var _this = this;
        var d = this.$q.defer();

        this.fb = this.$firebase(new Firebase(this.url + "breeders/"));
        this.fb.$on('value', function (snapshot) {
            var breeders = snapshot.snapshot.value;
            var breedersArr = (_this.$filter('orderByPriority')(breeders));

            d.resolve((breedersArr));
        });
        var d = this.$q.defer();

        return d.promise;
    };

    DataService.prototype.updateProfile = function (t) {
        var d = this.$q.defer();

        var key = t.Email.replace(/\./g, '(p)');

        this.fb = this.$firebase(new Firebase(this.url + "breeders/"));
        this.fb[key] = { profile: t };
        this.fb.$save(key);
        d.resolve();
        return d.promise;
    };

    //=Photo Galleries
    DataService.prototype.getGalleries = function (id) {
        var key = id.replace(/\./g, '(p)');
        var fireGalleries = this.$firebase(new Firebase(this.url + "breeders/" + key + "/galleries"));

        fireGalleries.$on('value', function (snapshot) {
            var galleries = snapshot.snapshot.value;
            d.resolve(galleries);
        });
        var d = this.$q.defer();

        return d.promise;
    };

    //=Testimonials
    DataService.prototype.saveNewTestimonials = function (feedbacks, userName) {
        var d = this.$q.defer();
        var fireTestimonials = this.$firebase(new Firebase(this.url + "breeders/" + userName + "/testimonials"));
        var keys = fireTestimonials.$getIndex();
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

    //    =Litters
    DataService.prototype.getLitters = function (userName) {
        var _this = this;
        var d = this.$q.defer();

        var fireLitters = this.$firebase(new Firebase(this.url + "breeders/" + userName + "/litters"));

        fireLitters.$on('value', function (snapshot) {
            var litters = snapshot.snapshot.value;

            var arrLitters = _.rest(_this.$filter('orderByPriority')(litters));
            arrLitters.forEach(function (litter) {
                litter.Photos = _.rest(_this.$filter('orderByPriority')(litter.Photos));
            });

            d.resolve(arrLitters);
        });
        return d.promise;
    };

    DataService.prototype.saveNewLitters = function (userName, litters) {
        var d = this.$q.defer();
        var fireLitters = this.$firebase(new Firebase(this.url + "breeders/" + userName + "/litters"));
        var keys = fireLitters.$getIndex();
        return d.promise;
    };

    DataService.prototype.updateTitle = function (galleryId, title, userName) {
        var d = this.$q.defer();

        var fireGallery = this.$firebase(new Firebase(this.url + "breeders/" + userName + "/galleries/" + galleryId));
        fireGallery.$update({ Title: title }).then(function () {
            d.resolve();
        });

        //        fireGallery.$save();
        return d.promise;
    };

    DataService.prototype.deletePhoto = function (galleryId, photoId, userName) {
        var d = this.$q.defer();
        var fireGalleriesPhotos = this.$firebase(new Firebase(this.url + "breeders/" + userName + "/galleries/" + galleryId + "/Photos/" + photoId));

        fireGalleriesPhotos.$remove().then(function () {
            d.resolve();
        });
        return d.promise;
    };
    return DataService;
})();
