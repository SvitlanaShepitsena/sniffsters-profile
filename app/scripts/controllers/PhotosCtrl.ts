/// <reference path="HomeCtrl.ts" />
/// <reference path="../models/IBreederProfile.ts" />

interface IPhotosScope extends IMainScope {
    photosCtrl:PhotosCtrl;
    home:HomeCtrl;
    isOk:boolean;
}
class PhotosCtrl {
    public GalleriesNew:IGallery[];
    public Galleries:IGallery[];

    public SelectedGallery:IGallery;
    public SelectedGalleryEdit:IGallery;

    constructor(public $scope, public $filter, public $firebase, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService, public CopyProfileService:CopyProfileService) {
        $scope.home.menuIndex = 2;

        $scope.$watch("photosCtrl.GalleriesNew", () => {
            for (var i = 0; i < this.GalleriesNew.length; i++) {
                var gallery:IGallery = this.GalleriesNew[i];
                if (!(
                    typeof(gallery.Title) != 'undefined' && gallery.Title.length < 250
                    )) {
                    this.$scope.isOk = true;
                    break;
                } else {

                    this.$scope.isOk = false;
                }
            }
        }, true);


        var newGallery = new Gallery();
        this.GalleriesNew = new Array(newGallery);

        $scope.photosCtrl = this;

        $scope.home.url = "photos";

        this.$scope.home.auth.$getCurrentUser().then((user) => {

            this.$scope.home.Breedership(this.$scope.home.FireProcess(user.email)).then(() => {
                var galleriesUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.FireProcess(user.email) + '/galleries';
                $scope.galleries = $firebase(new Firebase(galleriesUrl));
                $scope.newGalleries = [];

            })
        })
        $scope.onNewFileSelect = ($files, galleryId:string) => {
            var photos = $scope.galleries.$child(galleryId).$child('photos');
            console.log(galleryId);

            $files.forEach((file)=> {
                var reader = new FileReader();
                reader.onload = (loadEvent)=> {
                    var image = loadEvent.target.result;
                    photos.$add({
                        caption: 'picture1',
                        file64: image
                    });
                }
                reader.readAsDataURL(file);
            })

            photos.$save();

        }


        $scope.up = ($files, index) => {
            if (index == $files.length) {
                return;
            }
            var littersUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.userNameFire + '/litters/';
            var littersRef = $firebase(new Firebase(littersUrl));
            var litter = new Litter();
            litter.Title = $scope.l.Title;
            litter.DateOfBirth = $scope.l.DateOfBirth;
            litter.Puppies = $scope.l.Puppies;
            litter.Colors = $scope.l.Colors;
            litter.isTemp = true;

            littersRef.$add(litter).then((keyChild) => {
                var litterRef = $firebase(new Firebase(littersUrl + keyChild.name()));
                var photosRef = litterRef.$child('photos');

                $files.forEach((file)=> {
                    var reader = new FileReader();
                    reader.onload = (loadEvent)=> {
                        var image = loadEvent.target.result;
                        $scope.tempPhotos.push(image);
                        photosRef.$add({
                            caption: 'picture1',
                            file64: image
                        });
                    }
                    reader.readAsDataURL(file);
                })
            });

            $files.forEach((file)=> {
                var reader = new FileReader();
                reader.onload = (loadEvent)=> {
                    $scope.fileFired = loadEvent.target.result;
                }
                reader.readAsDataURL(file);
            })
        }
    }

    saveNewGalleries() {
        this.$scope.newGalleries.forEach((gallery, index)=> {
            var galleryShort = _.omit(gallery, 'Photos');


            this.$scope.galleries.$add(galleryShort).then((key) => {
                gallery.Photos.forEach((photo)=> {
                    this.$scope.galleries.$child(key.name()).$child('Photos').$add(_.omit(photo, 'isSized'));
                })
                this.$scope.newGalleries.splice(index, 1);
            });
//            gallery.Photos.forEach((photo)=> {
//                console.log(photo);
//            })
        })
    }

    updateGallery(galleries:IGallery[], index:number) {
        if (galleries.length == 0) {
            if (this.GalleriesNew.length == 0) {
                this.GalleriesNew.push(new Gallery());
            }
            return;
        }
        var gallery = galleries[index];

        this.DataService.updateGallery(gallery).then(() => {
            this.GalleriesNew.splice(index, 1);
            this.Galleries.push(gallery);


            this.updateGallery(galleries, index);
        })
    }

    addGallery() {

        var gallery = new Gallery();
        gallery.Title = "";
        gallery.isTemp = true;
        this.$scope.newGalleries.unshift(gallery);

    }

    setSelectedGallery(galleryId:number) {

        this.SelectedGallery = this.Galleries[galleryId];
        this.$state.go('profile.photos2.galleries', {'id': galleryId});
//        console.log(this.SelectedGallery);
    }

    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

    CreateSelectedGalleryClone() {
        this.SelectedGalleryEdit = new Gallery();
        for (var key in this.SelectedGallery) {
            if (this.SelectedGallery.hasOwnProperty(key)) {
                this.SelectedGalleryEdit[key] = this.SelectedGallery[key];
            }
        }
//        console.log(this.SelectedGalleryEdit);
//        console.log(this.SelectedGallery);
//        return dolly;
    }
}