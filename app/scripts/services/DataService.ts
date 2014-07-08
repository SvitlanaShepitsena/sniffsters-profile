/// <reference path="../../bower_components/DefinitelyTyped/underscore/underscore.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angularfire/angularfire.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../models/IBreederProfile.ts" />
class DataService {
    fb:AngularFire;

    constructor(public $http:ng.IHttpService, public $q:ng.IQService, public $firebase, public $filter) {

    }

    getProfile(id:string) {

        var key:string = id.replace(/\./g, '(p)');
        this.fb = this.$firebase(new Firebase("https://torid-fire-6526.firebaseio.com/breeders/" + key + "/profile"));
        this.fb.$on('value', (snapshot:any)=> {
            var breeder = snapshot.snapshot.value;
            d.resolve(breeder);
        })
        var d = this.$q.defer();

        return d.promise;
    }


    updateProfile(t:IBreederProfile) {
        var d = this.$q.defer();


        var key:string = t.Email.replace(/\./g, '(p)');

        this.fb = this.$firebase(new Firebase("https://torid-fire-6526.firebaseio.com/breeders/"));
        this.fb[key] = {profile: t};
        this.fb.$save(key);
        d.resolve();
        return d.promise;
    }


    getGalleries(id:string) {

        var key:string = id.replace(/\./g, '(p)');
        var fireGalleries = this.$firebase(new Firebase("https://torid-fire-6526.firebaseio.com/breeders/" + key + "/galleries"));
        //console.log(fireGalleries);

        fireGalleries.$on('value', (snapshot:any)=> {
            var galleries = snapshot.snapshot.value;
            d.resolve(galleries);
        })
        var d = this.$q.defer();

        return d.promise;
    }

    getMessages(id:string) {
        var d = this.$q.defer();

        var fireMessages = this.$firebase(new Firebase("https://torid-fire-6526.firebaseio.com/breeders/" + id + "/messages"));

        fireMessages.$on('value', (snapshot:any)=> {
            var messages = snapshot.snapshot.value;

            d.resolve(messages);
        });
        return d.promise;
    }

    getLitters(userName:string) {
        var d = this.$q.defer();

        var fireLitters = this.$firebase(new Firebase("https://torid-fire-6526.firebaseio.com/breeders/" + userName + "/litters"));

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

    getFeedbacks(userName:string) {

        var d = this.$q.defer();

        var fireLitters = this.$firebase(new Firebase("https://torid-fire-6526.firebaseio.com/breeders/" + userName + "/feedbacks"));

        fireLitters.$on('value', (snapshot:any)=> {
            var feedbacks = snapshot.snapshot.value;
            d.resolve(feedbacks);
        })
        return d.promise;
    }


    deletePhoto(galleryId:number, photoId:number, userName:string) {
        var d = this.$q.defer();
        var fireGalleriesPhotos = this.$firebase(new Firebase("https://torid-fire-6526.firebaseio.com/breeders/" + userName + "/galleries/" + galleryId +
            "/Photos/" + photoId));

        fireGalleriesPhotos.$remove().then(() => {
            d.resolve();
        })

        return d.promise;
    }

    saveNewLitters(userName:string, litters:Litter[]) {

        var d = this.$q.defer();
        var fireLitters:AngularFire = this.$firebase(new Firebase("https://torid-fire-6526.firebaseio.com/breeders/" + userName + "/litters"));
        var keys = fireLitters.$getIndex();
        return d.promise;
    }

    saveNewTestimonials<T>(feedbacks:IFeedback[]) {

        var d = this.$q.defer<T[]>();
        console.log(feedbacks);
        this.$http.post('http://localhost:44300/BreederPersonal/SaveNewFeedbacks', {
            feedbacks: feedbacks
        })
            .success((result:T[]) => {
                d.resolve(result);
            }).error(() => {
                d.reject();
            });
        return d.promise;
    }

    deleteLitterPhoto(galleryId:number, photoId:number) {
        var d = this.$q.defer();

        this.$http.post('http://localhost:44300/BreederPersonal/DeleteLitterPhoto', {
            deletePhoto: {
                GalleryId: galleryId,
                PhotoId: photoId
            }})
            .success(() => {
                d.resolve();
            }).error(() => {
                d.reject();
            });
        return d.promise;
    }

    updateCaption(galleryId:number, photoId:number, caption:string) {
        var d = this.$q.defer();

        this.$http.post('http://localhost:44300/BreederPersonal/UpdateCaption', {
            photoCaption: {
                GalleryId: galleryId,
                PhotoId: photoId,
                Caption: caption
            }})
            .success(() => {
                d.resolve();
            }).error(() => {
                d.reject();
            });
        return d.promise;
    }

    updateTitle(galleryId:number, title:string, userName:string) {
        var d = this.$q.defer();

        var fireGallery = this.$firebase(new Firebase("https://torid-fire-6526.firebaseio.com/breeders/" + userName + "/galleries/" + galleryId));
        console.log(fireGallery);
        fireGallery.$update({Title: title}).then(() => {
            d.resolve();
        })
//        fireGallery.$save();

        return d.promise;
    }

    deleteGallery(galleryId:number) {
        var d = this.$q.defer();

        this.$http.post('http://localhost:44300/BreederPersonal/DeleteGallery', {
            galleryId: galleryId
        })
            .success(() => {
                d.resolve();
            }).error(() => {
                d.reject();
            });
        return d.promise;
    }

    shareGallery(galleryId:number) {
        var d = this.$q.defer();

        this.$http.post('http://localhost:44300/BreederPersonal/ShareGallery', {
            galleryId: galleryId
        })
            .success(() => {
                d.resolve();
            }).error(() => {
                d.reject();
            });
        return d.promise;
    }

    updateGallery(gallery:IGallery) {
        var d = this.$q.defer();

        this.$http.post('http://localhost:44300/BreederPersonal/UpdateGallery', {
            gallery: gallery
        })
            .success(() => {
                d.resolve();
            }).error(() => {
                d.reject();
            });
        return d.promise;
    }

    convertNewGalleries(galleries:number[]) {

        var d = this.$q.defer();

        this.$http.post('http://localhost:44300/BreederPersonal/ConvertNewGalleries', {
            galleries: galleries
        })
            .success(() => {
                d.resolve();
            }).error(() => {
                d.reject();
            });
        return d.promise;
    }

    updateLitter(litter:ILitter, userName) {
        var d = this.$q.defer();
        var unp:string = userName.replace(/\./g, '(p)');

        var fbLitter = this.$firebase(new Firebase("https://torid-fire-6526.firebaseio.com/breeders/" + unp + "/litters/" + litter.Id));
        fbLitter [litter.Id] = litter;
        fbLitter.$save(litter.Id);

        d.resolve();
        return d.promise;
    }

    updateFeedback(feedback:IFeedback) {
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
    }

    deleteLitter(id:number) {
        var d = this.$q.defer();

        this.$http.post('http://localhost:44300/BreederPersonal/DeleteLitter', {
            litterId: id
        })
            .success(() => {
                d.resolve();
            }).error(() => {
                d.reject();
            });
        return d.promise;
    }

    deleteFeedback(id:number) {
        var d = this.$q.defer();

//        this.$http.post('http://localhost:44300/BreederPersonal/DeleteFeedback', {
//            feedbackId: id
//        })
//            .success(() => {
        d.resolve();
//            }).error(() => {
//                d.reject();
//            });
        return d.promise;
    }


    updateGalleries<T>(t:T[]) {
        var d = this.$q.defer<T>();

        this.$http.post('http://localhost:44300/BreederPersonal/UpdateGalleries', {Galleries: t})
            .success(() => {
                d.resolve();
            }).error((data, error) => {
                // console.log(data)
                // console.log(error)
                d.reject();
            });
        return d.promise;
    }
}
