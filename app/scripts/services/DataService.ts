class DataService {
    fb:AngularFire;

    constructor(public $http:ng.IHttpService, public $q:ng.IQService, public $firebase) {

    }

    getProfile(id:string) {

        var key:string = id.replace(/\./g, '(p)');
        this.fb = this.$firebase(new Firebase("https://torid-fire-6526.firebaseio.com/breeders/" + key + "/profile"));
        this.fb.$on('value', (snapshot:any)=> {
            var breeder = snapshot.snapshot.value;
            d.resolve(breeder);
        })
//        console.log(bp);
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

    getLitters() {
        var d = this.$q.defer();
//        this.$http.get('http://localhost:44300/BreederPersonal/GetLitters').success((result:T[]) => {
        var litters:ILitter[] = [];
        litters.push(new Litter());
        d.resolve(litters);
//        }).error((data, error) => {
//            // console.log(data)
//            // console.log(error)
//            d.reject();
//        });
        return d.promise;
    }

    getFeedbacks() {

        var d = this.$q.defer();

        //  this.$http.get('http://localhost:44300/BreederPersonal/GetFeedbacks').success((result:T[]) => {
        var feedbacks:IFeedback[] = [];
        feedbacks.push(new Feedback());

        d.resolve(feedbacks);
//        }).error((data, error) => {
//            // console.log(data)
//            // console.log(error)
//            d.reject();
//        });
        return d.promise;
    }


    deletePhoto(galleryId:number, photoId:number) {
        var d = this.$q.defer();

        this.$http.post('http://localhost:44300/BreederPersonal/DeletePhoto', {
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

    saveNewLitters<T>(litters:Litter[]) {

        var d = this.$q.defer<T[]>();

        this.$http.post('http://localhost:44300/BreederPersonal/SaveNewLitters', {
            litters: litters

        })
            .success(() => {
                d.resolve();
            }).error(() => {
                d.reject();
            });
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

    updateTitle(galleryId:number, title:string) {
        var d = this.$q.defer();

        this.$http.post('http://localhost:44300/BreederPersonal/UpdateTitle', {
            galleryTitle: {
                GalleryId: galleryId,
                Title: title
            }})
            .success(() => {
                d.resolve();
            }).error(() => {
                d.reject();
            });
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

    updateLitter(litter:ILitter) {
        var d = this.$q.defer();

        this.$http.post('http://localhost:44300/BreederPersonal/SaveLitter', {
            litter: litter
        })
            .success(() => {
                d.resolve();
            }).error(() => {
                d.reject();
            });
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

    getGalleries() {
        var d = this.$q.defer();
        var galleries:IGallery[] = [];

        var gallery1 = new Gallery();
        gallery1.Title = "Gallery1";
        gallery1.Id = 3;
        gallery1.IsActive = true;
        gallery1.Photos = [new Photo()]
        galleries.push(gallery1);


//        this.$http.get('http://localhost:44300/BreederPersonal/GetGalleries').success((result:T[]) => {
        d.resolve(galleries);
//        }).error((data, error) => {
        // console.log(data)
        // console.log(error)
//            d.reject();
//        });
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
