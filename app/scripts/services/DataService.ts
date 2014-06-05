class DataService {
    constructor(public $http:ng.IHttpService, public $q:ng.IQService) {
    }

    getProfile<T>() {
        var d = this.$q.defer<T>();

        this.$http.get('http://localhost:44300/BreederPersonal/GetProfile').success((result) => {

            d.resolve(result);
        }).error((data, error) => {
            // console.log(data)
            // console.log(error)
            d.reject();
        });
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
    updateCaption(galleryId:number, photoId:number, caption:string) {
        var d = this.$q.defer();

        this.$http.post('http://localhost:44300/BreederPersonal/UpdateCaption', {
            photoCaption: {
                GalleryId: galleryId,
                PhotoId: photoId,
                Caption:caption
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

    getGalleries<T>() {
        var d = this.$q.defer<T[]>();

        this.$http.get('http://localhost:44300/BreederPersonal/GetGalleries').success((result) => {
            d.resolve(result);
        }).error((data, error) => {
            // console.log(data)
            // console.log(error)
            d.reject();
        });
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
