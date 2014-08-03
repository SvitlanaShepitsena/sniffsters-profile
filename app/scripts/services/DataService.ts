/// <reference path="../../bower_components/DefinitelyTyped/underscore/underscore.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angularfire/angularfire.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../models/IBreederProfile.ts" />

class DataService {
    fb:AngularFire;
    url:string;
    urlLooker:string;
    urlBreeder:string;


    constructor(public $http:ng.IHttpService, public $q:ng.IQService, public $firebase, public settings, public $filter) {
        this.url = settings.mainUrl;
        this.urlLooker = this.url + "lookers/";
        this.urlBreeder = this.url + "breeders/";
    }

    // =Messages
    sendReply(userName:string, corrUserName:string, corrUserNameNick:string, reply:string) {
        userName = this.FireProcess(userName);
        corrUserName = this.FireProcess(corrUserName);
        corrUserNameNick = this.FireProcess(corrUserNameNick);

        var d = this.$q.defer();
        var corrUserUrl = this.urlBreeder + userName + "/messages";
        var corrUserRef = this.$firebase(new Firebase(corrUserUrl));

        var note = new Note();
        note.amISender = true;
        note.sent = Date.now();
        note.body = reply;


        note.isTrash = false;
        note.userName = corrUserName;
        note.nickName = corrUserNameNick;
        corrUserRef.$add(note);

        d.resolve();

        return d.promise;
    }

    sendLookerReply(userName:string, corrUserName:string, corrUserNameNick:string, reply:string) {
        userName = this.FireProcess(userName);
        corrUserName = this.FireProcess(corrUserName);
        corrUserNameNick = this.FireProcess(corrUserNameNick);
        var d = this.$q.defer();

        var corrUserUrl = this.urlLooker + userName + "/messages";
        var corrUserRef = this.$firebase(new Firebase(corrUserUrl));

        var note = new Note();
        note.amISender = true;
        note.sent = Date.now();
        note.body = reply;

        note.isTrash = false;
        note.userName = corrUserName;
        note.nickName = corrUserNameNick;
        corrUserRef.$add(note);

        d.resolve();

        return d.promise;
    }

    deleteConversation(userName:string, corrUserName:string, isBreeder:boolean) {
        userName = this.FireProcess(userName);
        corrUserName = this.FireProcess(corrUserName);

        var d = this.$q.defer();
        var url = isBreeder ? this.urlBreeder : this.urlBreeder;
        var messagesUrl = url + userName + "/messages";
        var notesRef = this.$firebase(new Firebase(messagesUrl));

        var keys = notesRef.$getIndex();
        var allNotes = [];
        keys.forEach((key)=> {
            allNotes.push(notesRef[key]);
        })
        var notes = _.where(allNotes, {isTrash: false, userName: corrUserName});

        notes.forEach((note)=> {
            note.isTrash = true;
        })
        notesRef.$save();
        d.resolve();

        return d.promise;
    }

    recoverConversation(userName:string, corrUserName:string, isBreeder:boolean) {
        userName = this.FireProcess(userName);
        corrUserName = this.FireProcess(corrUserName);

        var d = this.$q.defer();
        var url = isBreeder ? this.urlBreeder : this.urlBreeder;
        var messagesUrl = url + userName + "/messages";
        var notesRef = this.$firebase(new Firebase(messagesUrl));

        var keys = notesRef.$getIndex();
        var allNotes = [];
        keys.forEach((key)=> {
            allNotes.push(notesRef[key]);
        })
        var notes = _.where(allNotes, {isTrash: true, userName: corrUserName});

        notes.forEach((note)=> {
            note.isTrash = false;
        })
        notesRef.$save();
        d.resolve();

        return d.promise;
    }

    deleteForever(userName:string, corrUserName:string, isBreeder:boolean) {
        userName = this.FireProcess(userName);
        corrUserName = this.FireProcess(corrUserName);
//
        var d = this.$q.defer();
        var url = isBreeder ? this.urlBreeder : this.urlBreeder;
        var messagesUrl = url + userName + "/messages";
        var notesRef = this.$firebase(new Firebase(messagesUrl));

        var keys = notesRef.$getIndex();
        keys.forEach((key)=> {
            var value = notesRef[key];
            if (value.isTrash === true && value.userName === corrUserName) {
                notesRef.$remove(key);
            }
        })

        notesRef.$save();
        d.resolve();

        return d.promise;
    }

    getLookerMessages(userName:string) {
        userName = this.FireProcess(userName);
        var d = this.$q.defer();
        var fireMessages = this.$firebase(new Firebase(this.url + "lookers/" + userName + "/messages"));

        fireMessages.$on('value', (snapshot:any)=> {
            var messages = snapshot.snapshot.value;

            d.resolve(this.$filter('orderByPriority')(messages));
        });
        return d.promise;
    }

    getMessages(userName:string) {
        userName = this.FireProcess(userName);
        var d = this.$q.defer();

        var fireMessages = this.$firebase(new Firebase(this.urlBreeder + userName + "/messages"));

        fireMessages.$on('value', (snapshot:any)=> {
            var messages = snapshot.snapshot.value;

            d.resolve(this.$filter('orderByPriority')(messages));
        });
        return d.promise;
    }

    FireProcess(userName:string) {
        return userName.replace(/\./g, '(p)');
    }

    FireUnProcess(userName:string) {
        return userName.replace(/\(p\)/g, '.');

    }

    // =Followeings

    getMyLookerFollowings(userName:string) {

        userName = this.FireProcess(userName);

        var d = this.$q.defer();

        var followingsUrl = this.url + "lookers/" + userName + "/followings";
        var followingsRef = this.$firebase(new Firebase(followingsUrl));

        followingsRef.$on('value', (snapshot:any)=> {
            var followings = snapshot.snapshot.value;
            var followingssArr = _.map(_.keys(followings), (value:string)=> {
                return this.FireUnProcess(value);
            });

            d.resolve(followingssArr);

        });
        return d.promise;
    }

    getMyFollowings(userName:string) {

        userName = this.FireProcess(userName);

        var d = this.$q.defer();

        var followingsUrl = this.urlBreeder + userName + "/followings";
        var followingsRef = this.$firebase(new Firebase(followingsUrl));

        followingsRef.$on('value', (snapshot:any)=> {
            var followings = snapshot.snapshot.value;
            var followingssArr = _.map(_.keys(followings), (value:string)=> {
                return this.FireUnProcess(value);
            });

            d.resolve(followingssArr);

        });
        return d.promise;
    }

    getMyFollowers(userName:string) {

        userName = this.FireProcess(userName);

        var d = this.$q.defer();

        var followersUrl = this.urlBreeder + userName + "/followers";
        var followersRef = this.$firebase(new Firebase(followersUrl));

        followersRef.$on('value', (snapshot:any)=> {
            var followers = snapshot.snapshot.value;
            var followersArr = _.map(_.keys(followers), (value:string)=> {
                return this.FireUnProcess(value);
            });

            d.resolve(followersArr);

        });
        return d.promise;
    }

    followLookerUser(userName:string, followerName:string) {
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
    }

    followUser(userName:string, followerName:string) {
        userName = this.FireProcess(userName);
        followerName = this.FireProcess(followerName);
        var d = this.$q.defer();

        var followingsUrl = this.urlBreeder + userName + "/followings";
        var followingsRef = this.$firebase(new Firebase(followingsUrl));

        var followingRef = followingsRef.$child(followerName);
        followingRef.$add(1);

        followingsRef.$save();

        var followersUrl = this.urlBreeder + followerName + "/followers";
        var followersRef = this.$firebase(new Firebase(followersUrl));

        var followerRef = followersRef.$child(userName);
        followerRef.$add(1);

        followersRef.$save();


        d.resolve();
        return d.promise;
    }


    unFollowLookerUser(userName:string, followerName:string) {
        userName = this.FireProcess(userName);
        followerName = this.FireProcess(followerName);
        var d = this.$q.defer();

        var followingUrl = this.url + "lookers/" + userName + "/followings/" + followerName;
        var followingRef = this.$firebase(new Firebase(followingUrl));

        followingRef.$remove();
        followingRef.$save();

        d.resolve();
        return d.promise;
    }

    unFollowUser(userName:string, followerName:string) {
        userName = this.FireProcess(userName);
        followerName = this.FireProcess(followerName);
        var d = this.$q.defer();

        var followingUrl = this.urlBreeder + userName + "/followings/" + followerName;
        var followingRef = this.$firebase(new Firebase(followingUrl));

        followingRef.$remove();
        followingRef.$save();


        var followerUrl = this.urlBreeder + followerName + "/followers/" + userName;
        var followerRef = this.$firebase(new Firebase(followerUrl));

        followerRef.$remove();
        followerRef.$save();


        d.resolve();
        return d.promise;
    }

    //=Profile

    getProfile(id:string) {
        var key:string = id.replace(/\./g, '(p)');
        this.fb = this.$firebase(new Firebase(this.urlBreeder + key + "/profile"));
        this.fb.$on('value', (snapshot:any)=> {
            var breeder = snapshot.snapshot.value;
            d.resolve(breeder);
        })
        var d = this.$q.defer();

        return d.promise;
    }

    getAllProfiles() {
        var d = this.$q.defer();

        this.fb = this.$firebase(new Firebase(this.urlBreeder));
        this.fb.$on('value', (snapshot:any)=> {

            var breeders = snapshot.snapshot.value;
            var breedersArr = (this.$filter('orderByPriority')(breeders));

            d.resolve((breedersArr));
        })
        var d = this.$q.defer();

        return d.promise;
    }


    updateProfile(t:IBreederProfile) {
        var d = this.$q.defer();


        var key:string = t.Email.replace(/\./g, '(p)');

        this.fb = this.$firebase(new Firebase(this.urlBreeder));
        this.fb[key] = {profile: t};
        this.fb.$save(key);
        d.resolve();
        return d.promise;
    }

    //=Photo Galleries

    getGalleries(id:string) {

        var key:string = id.replace(/\./g, '(p)');
        var fireGalleries = this.$firebase(new Firebase(this.urlBreeder + key + "/galleries"));

        fireGalleries.$on('value', (snapshot:any)=> {
            var galleries = snapshot.snapshot.value;
            d.resolve(galleries);
        })
        var d = this.$q.defer();

        return d.promise;
    }


    //=Testimonials

    saveNewTestimonials<T>(feedbacks:IFeedback[], userName:string) {
        var d = this.$q.defer();
        var fireTestimonials:AngularFire = this.$firebase(new Firebase(this.urlBreeder + userName + "/testimonials"));
        var keys = fireTestimonials.$getIndex();
        return d.promise;
    }

    /*    updateFeedback(feedback:IFeedback) {
     var d = this.$q.defer();

        this.$http.post('http://localhost:44300/BreederPersonal/UpdateFeedback', {
            feedback: feedback
        })
            .success(() => {
                d.resolve();
            }).error(() => {
                d.reject();
            });
        return d.promise;
     }*/

//    =Litters

    getLitters(userName:string) {
        var d = this.$q.defer();

        var fireLitters = this.$firebase(new Firebase(this.urlBreeder + userName + "/litters"));

        fireLitters.$on('value', (snapshot:any)=> {
            var litters = snapshot.snapshot.value;

            var arrLitters = _.rest(this.$filter('orderByPriority')(litters));
            arrLitters.forEach((litter:ILitter)=> {
                litter.Photos = _.rest(this.$filter('orderByPriority')(litter.Photos));
            })


            d.resolve(arrLitters);
        })
        return d.promise;
    }

    saveNewLitters(userName:string, litters:Litter[]) {

        var d = this.$q.defer();
        var fireLitters:AngularFire = this.$firebase(new Firebase(this.urlBreeder + userName + "/litters"));
        var keys = fireLitters.$getIndex();
        return d.promise;
    }

    updateTitle(galleryId:number, title:string, userName:string) {
        var d = this.$q.defer();

        var fireGallery = this.$firebase(new Firebase(this.urlBreeder + userName + "/galleries/" + galleryId));
        fireGallery.$update({Title: title}).then(() => {
            d.resolve();
        })
//        fireGallery.$save();

        return d.promise;
    }


    deletePhoto(galleryId:number, photoId:number, userName:string) {
        var d = this.$q.defer();
        var fireGalleriesPhotos = this.$firebase(new Firebase(this.urlBreeder + userName + "/galleries/" + galleryId +
            "/Photos/" + photoId));

        fireGalleriesPhotos.$remove().then(() => {
            d.resolve();
        })
        return d.promise;
    }
}
