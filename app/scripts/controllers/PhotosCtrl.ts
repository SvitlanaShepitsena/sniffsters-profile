/// <reference path="IndexCtrl.ts" />
/// <reference path="../models/IBreederProfile.ts" />

interface IPhotosScope extends IMainScope {
    photosCtrl:PhotosCtrl;
    index:IndexCtrl;
    isOk:boolean;
}
class PhotosCtrl {
    public GalleriesNew:IGallery[];
    public Galleries:IGallery[];

    public SelectedGallery:IGallery;
    public SelectedGalleryEdit:IGallery;

    constructor(public $scope:IPhotosScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService, public CopyProfileService:CopyProfileService) {
        $scope.index.menuIndex = 2;

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

        $scope.index.url = "photos";

        DataService.getGalleries($scope.index.BreederName).then((galleries:IGallery[])=> {
            this.Galleries = galleries;
        })
    }

    saveNewGalleries() {
        var index = 0;
        var newGalleries:number[] = [];

        this.GalleriesNew.forEach((gallery:IGallery) => {
            newGalleries.push(gallery.Id);
        });

        this.DataService.convertNewGalleries(newGalleries).then(() => {

            this.GalleriesNew.forEach((gallery:IGallery) => {
                gallery.IsActive = true;
                this.Galleries.push(gallery);
            });
            this.GalleriesNew = [];
            this.GalleriesNew.push(new Gallery());
            this.ShowSuccess("Galleries have been saved to Db");

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
        this.GalleriesNew.push(new Gallery());
    }

    setSelectedGallery(galleryId:number) {
        console.log(galleryId);
        var galid:number = 0;
        var index:number = 0;
        this.Galleries.forEach((gallery:IGallery) => {
            if (gallery.Id === galleryId) {
                galid = index;
                return false;
            }
            index++;
        });
        this.SelectedGallery = this.Galleries[galid];
        this.$state.go('profile.photos2.galleries', {'id': galid});
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