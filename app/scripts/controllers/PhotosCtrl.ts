// <reference path="HomeCtrl.ts" />
/// <reference path="../models/IBreederProfile.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/underscore/underscore.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase.d.ts" />

class PhotosCtrl {
    public GalleriesNew:IGallery[];

    constructor(public $scope, public $filter, public $firebase, $stateParams, public $state, settings) {
        $scope.home.menuIndex = 2;
        $scope.noGalleryNotice = settings.noGalleryNotice;

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


        var galleriesUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.FireProcess($stateParams.uname) + '/galleries';
        $scope.galleries = $firebase(new Firebase(galleriesUrl));

        $scope.newGalleries = [];

        this.$scope.home.auth.$getCurrentUser().then((user) => {
            if (user == null) {
                $scope.home.isLoadFinished = true;
                return;
            }
            this.$scope.home.Breedership(this.$scope.home.FireProcess(user.email)).then(() => {
                $scope.home.isLoadFinished = true;
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
    }

    saveNewGalleries() {
        this.$scope.newGalleries.forEach((gallery, index)=> {
            if (gallery.Title === "") {
                gallery.Title = "New Gallery";
            }
            var galleryShort = _.omit(gallery, 'Photos');
            this.$scope.galleries.$add(galleryShort).then((key) => {
                gallery.Photos.forEach((photo)=> {
                    this.$scope.galleries.$child(key.name()).$child('Photos').$add(_.omit(photo, 'isSized'));
                })
            });
        })
        this.$scope.newGalleries = [];
    }

    cancelGalleries() {
        this.$scope.newGalleries = [];
    }

    addGallery() {
        this.$scope.addGallTemplate = true;
        var gallery = new Gallery();
        gallery.Title = "New Gallery";
        gallery.isTemp = true;
        this.$scope.newGalleries.unshift(gallery);
    }
}