class DataService {
    constructor(public $http:ng.IHttpService, public $q:ng.IQService) {
    }

    getProfile<T>(id:string) {
        var d = this.$q.defer<T>();
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
        b.Certifications = []
//        d.resolve(n)
//        this.$http.post('http://localhost:44300/BreederPersonal/GetProfile', {id: id}).success((result:T) => {
//
//            d.resolve(result);
//        }).error((data, error) => {
//            // console.log(data)
//            // console.log(error)
//            d.reject();
//        });
        return d.promise;
    }

    getLitters<T>() {
        var d = this.$q.defer<T[]>();
//        this.$http.get('http://localhost:44300/BreederPersonal/GetLitters').success((result:T[]) => {
        var litters : ILitter[]=[];
        litters.push(new Litter());
        d.resolve(litters);
//        }).error((data, error) => {
//            // console.log(data)
//            // console.log(error)
//            d.reject();
//        });
        return d.promise;
    }

    getFeedbacks<T>() {
        var d = this.$q.defer<T[]>();

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

    updateProfile<T>(t:T) {
        var d = this.$q.defer<T>();

        this.$http.post('http://localhost:44300/BreederPersonal/UpdateUserProfile', {BreederViewModel: t})
            .success(() => {
                d.resolve();
            }).error((data, error) => {
                // console.log(data)
                // console.log(error)
                d.reject();
            });
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

    getGalleries<T>() {
        var d = this.$q.defer<T[]>();
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
