var IndexCtrl = function () {
    function IndexCtrl($scope, $location, $rootScope, $window, $state, toastr, DataService, CopyProfileService) {
        var _this = this;
        this.$scope = $scope, this.$rootScope = $rootScope, this.$window = $window, this.$state = $state, this.toastr = toastr, this.DataService = DataService, this.CopyProfileService = CopyProfileService, this.url = "about", $scope.navigate = function (menuIndex) {
            2 == menuIndex && ($scope.slide = "slide-left", $location.url("/profile/photos")), 1 == menuIndex && ($scope.slide = "slide-right", $location.url("/profile/about"))
        }, this.menuIndex = 1, $scope.slide = "", $rootScope.back = function () {
            $scope.slide = "slide-left", $window.history.back()
        }, $rootScope.forward = function () {
            $scope.slide = "slide-right", $window.history.forward()
        }, $scope.index = this, this.spinner = !0;
        var promiseT = this.DataService.getProfile();
        promiseT.then(function (breederProfile) {
            _this.error = !1, _this.BreederProfile = breederProfile, _this.Id = breederProfile.Email, _this.CopyProfileService.SetProfile(breederProfile), _this.BreederProfileEdit = CopyProfileService.GetProfileClone()
        }, function () {
            _this.error = !0, _this.ShowError("Error in Db Connection")
        }).finally(function () {
            _this.spinner = !1
        })
    }

    return IndexCtrl.prototype.SaveKennelName = function () {
        var breederProfileOriginal = this.CopyProfileService.GetProfileClone();
        breederProfileOriginal.KennelName = this.BreederProfileEdit.KennelName, breederProfileOriginal.Story = this.BreederProfileEdit.Story, this.Save(breederProfileOriginal)
    }, IndexCtrl.prototype.SaveAboutParents = function () {
        var breederProfileOriginal = this.CopyProfileService.GetProfileClone();
        breederProfileOriginal.Parents = this.BreederProfileEdit.Parents, breederProfileOriginal.Girls = this.BreederProfileEdit.Girls, breederProfileOriginal.Boys = this.BreederProfileEdit.Boys, console.log(breederProfileOriginal), this.Save(breederProfileOriginal)
    }, IndexCtrl.prototype.SaveAddInfo = function () {
        var breederProfileOriginal = this.CopyProfileService.GetProfileClone();
        breederProfileOriginal.AddInfo = this.BreederProfileEdit.AddInfo, this.Save(breederProfileOriginal)
    }, IndexCtrl.prototype.Next = function (state) {
        this.$state.go(state)
    }, IndexCtrl.prototype.ShowError = function (errorMessage) {
        this.toastr.error(errorMessage)
    }, IndexCtrl.prototype.ShowSuccess = function (successMessage) {
        this.toastr.success(successMessage)
    }, IndexCtrl.prototype.Clone = function () {
        this.BreederProfileCopy = this.CopyProfileService.GetProfileClone()
    }, IndexCtrl.prototype.GetClone = function () {
        return this.CopyProfileService.GetProfileClone()
    }, IndexCtrl.prototype.UpdateBreederProfile = function (breederProfile) {
        this.BreederProfile = breederProfile
    }, IndexCtrl.prototype.Save = function (breederProfile) {
        var _this = this, promise = this.DataService.updateProfile(breederProfile);
        promise.then(function () {
            _this.CopyProfileService.SetProfile(breederProfile), _this.UpdateBreederProfile(breederProfile), _this.ShowSuccess("Successfully Saved")
        }, function () {
            _this.ShowError("Db Connection Problem")
        })
    }, IndexCtrl
}(), PhotosCtrl = function () {
    function PhotosCtrl($scope, $state, data, toastr, DataService, CopyProfileService) {
        this.$scope = $scope, this.$state = $state, this.toastr = toastr, this.DataService = DataService, this.CopyProfileService = CopyProfileService, $scope.index.menuIndex = 2;
        var newGallery = new Gallery;
        this.GalleriesNew = new Array(newGallery), $scope.photosCtrl = this, $scope.index.url = "photos", this.Galleries = data
    }

    return PhotosCtrl.prototype.saveNewGalleries = function () {
        var index = 0;
        this.updateGallery(this.GalleriesNew, index)
    }, PhotosCtrl.prototype.updateGallery = function (galleries, index) {
        var _this = this;
        if (0 == galleries.length)return void(0 == this.GalleriesNew.length && this.GalleriesNew.push(new Gallery));
        var gallery = galleries[index];
        this.DataService.updateGallery(gallery).then(function () {
            _this.GalleriesNew.splice(index, 1), _this.Galleries.push(gallery), _this.updateGallery(galleries, index)
        })
    }, PhotosCtrl.prototype.addGallery = function () {
        this.GalleriesNew.push(new Gallery)
    }, PhotosCtrl.prototype.setSelectedGallery = function (galleryId) {
        var galid = 0, index = 0;
        this.Galleries.forEach(function (gallery) {
            return gallery.Id === galleryId ? (galid = index, !1) : void index++
        }), this.SelectedGallery = this.Galleries[galid], this.$state.go("profile.photos2.galleries", {id: galid})
    }, PhotosCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, PhotosCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, PhotosCtrl.prototype.CreateSelectedGalleryClone = function () {
        this.SelectedGalleryEdit = new Gallery;
        for (var key in this.SelectedGallery)this.SelectedGallery.hasOwnProperty(key) && (this.SelectedGalleryEdit[key] = this.SelectedGallery[key])
    }, PhotosCtrl
}(), breederDetails = function () {
    return{restrict: "E", templateUrl: "views/directives/breeder-details.html", transclude: !0, replace: !0, scope: {ctrl: "=", text: "@", func: "&"}, link: function (scope) {
        scope.IsEdit = !1, scope.Edit = function () {
            scope.ctrl.Clone(), scope.IsEdit = !0
        }, scope.Cancel = function () {
            scope.IsEdit = !1
        }, scope.Save = function () {
            scope.Save(), scope.IsEdit = !1
        }
    }}
}, aboutInfo = function () {
    return{restrict: "E", templateUrl: "views/directives/about-info.html", replace: !0, scope: {ctrl: "=", text: "@", func: "&"}, link: function (scope) {
        scope.ctrl.url = "about"
    }}
}, aboutInfoEdit = function () {
    return{restrict: "E", templateUrl: "views/directives/about-info-edit.html", transclude: !0, replace: !0, scope: {ctrl: "=", text: "@", func: "&"}, link: function (scope) {
        scope.ResetAllFields = function () {
            scope.ctrl.BreederProfileEdit.KennelName = "", scope.ctrl.BreederProfileEdit.Story = "", scope.ctrl.BreederProfileEdit.Parents = "", scope.ctrl.BreederProfileEdit.Boys = "", scope.ctrl.BreederProfileEdit.Girls = "", scope.ctrl.BreederProfileEdit.AddInfo = "", scope.form.$setDirty()
        }, scope.Next = function () {
        }
    }}
}, button = function () {
    return{restrict: "E", template: "<button>Test</button>", transclude: !0, replace: !0, scope: {ctrl: "=", text: "@", func: "&"}, link: function () {
    }}
}, detailsInfo = function () {
    return{restrict: "E", templateUrl: "views/directives/details-info.html", replace: !0, scope: {ctrl: "=", text: "@", func: "&"}, link: function () {
    }}
}, detailsInfoEdit = function () {
    return{restrict: "E", templateUrl: "views/directives/details-info-edit.html", transclude: !0, replace: !0, scope: {ctrl: "=", text: "@", func: "&"}, link: function (scope) {
        scope.ResetFields = function () {
            console.log("reset"), scope.ctrl.BreederProfileEdit = new BreederProfile
        }, scope.SaveKennelName = function () {
            var breederProfileOriginal = scope.ctrl.GetClone();
            breederProfileOriginal.KennelName = scope.ctrl.BreederProfileEdit.KennelName, breederProfileOriginal.Story = scope.ctrl.BreederProfileEdit.Story, scope.ctrl.Save(breederProfileOriginal)
        }
    }}
}, litters = function () {
    return{restrict: "E", templateUrl: "views/directives/litters.html", transclude: !0, replace: !0, scope: {ctrl: "=", text: "@", func: "&"}, link: function () {
    }}
}, photoGalleries = function () {
    return{restrict: "E", templateUrl: "views/directives/photo-galleries.html", replace: !0}
}, photoGallery = function () {
    return{restrict: "E", templateUrl: "views/directives/photo-gallery.html", replace: !0, controller: function ($scope, $modal, DataService, $stateParams, $state, toastr) {
        $scope.tempPhoto = [];
        var index = 0;
        if (void 0 == $scope.photosCtrl.SelectedGallery) {
            var id = $stateParams.id;
            $scope.photosCtrl.SelectedGallery = $scope.photosCtrl.Galleries[id]
        }
        $scope.photosCtrl.SelectedGallery.Photos.forEach(function (photo) {
            $scope.tempPhoto.push(photo), $scope.photosCtrl.SelectedGallery.Photos.splice(index++, 1)
        }), $scope.tempPhoto.forEach(function (photo) {
            $scope.photosCtrl.SelectedGallery.Photos.push(photo)
        }), $scope.shareGallery = function () {
            DataService.shareGallery($scope.photosCtrl.SelectedGallery.Id).then(function () {
                $scope.photosCtrl.SelectedGallery.IsShared = !0, toastr.success("This gallery is shared.")
            }, function () {
            })
        }, $scope.delGallery = function () {
            var modalInstance = $modal.open({template: '<div><div class="modal-body"> Delete this gallery?</div><div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">OK</button><button class="btn btn-warning" ng-click="cancel()">Cancel</button></div></div>', size: "sm", controller: function ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close(!0)
                }, $scope.cancel = function () {
                    $modalInstance.close(!1)
                }
            }});
            modalInstance.result.then(function (confirmation) {
                confirmation && DataService.deleteGallery($scope.photosCtrl.SelectedGallery.Id).then(function () {
                    var id = $stateParams.id;
                    $scope.photosCtrl.Galleries.splice(id, 1), $state.go("profile.photos2", {})
                })
            })
        }
    }, link: function () {
    }}
}, photoGalleryEdit = function () {
    return{restrict: "E", templateUrl: "views/directives/photo-gallery-edit.html", replace: !0, controller: function ($scope, $stateParams, $upload, $modal, DataService, toastr) {
        $scope.photosCtrl.CreateSelectedGalleryClone(), $scope.tempPhoto = [];
        var index = 0;
        $scope.photosCtrl.SelectedGalleryEdit.Photos.forEach(function (photo) {
            $scope.tempPhoto.push(photo), $scope.photosCtrl.SelectedGalleryEdit.Photos.splice(index++, 1)
        }), $scope.tempPhoto.forEach(function (photo) {
            $scope.photosCtrl.SelectedGalleryEdit.Photos.push(photo)
        });
        var index = $stateParams.id;
        $scope.delete = function (p, index) {
            var modalInstance = $modal.open({template: '<div><div class="modal-body"> Delete image from your gallery?</div><div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">OK</button><button class="btn btn-warning" ng-click="cancel()">Cancel</button></div></div>', size: "sm", controller: function ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close(!0)
                }, $scope.cancel = function () {
                    $modalInstance.close(!1)
                }
            }});
            modalInstance.result.then(function (confirmation) {
                confirmation && DataService.deletePhoto($scope.photosCtrl.SelectedGallery.Id, p.Id).then(function () {
                    $scope.photosCtrl.SelectedGallery.Photos.splice(index, 1)
                })
            })
        }, $scope.update = function (p) {
            DataService.updateCaption($scope.photosCtrl.SelectedGallery.Id, p.Id, p.Caption).then(function () {
                toastr.success("Changes have been successfully saved to Db")
            })
        }, $scope.updateTitle = function (newTitle) {
            DataService.updateTitle($scope.photosCtrl.SelectedGallery.Id, newTitle).then(function () {
                toastr.success("Changes have been successfully saved to Db")
            })
        }, $scope.onFileSelect = function ($files) {
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                $scope.upload = $upload.upload({url: "/BreederPersonal/AddPicture", data: {gallery: $scope.photosCtrl.SelectedGallery.Id}, file: file}).progress(function () {
                }).success(function (data) {
                    $scope.photosCtrl.SelectedGallery.Photos.push(data)
                })
            }
        }
    }}
}, photosInfo = function () {
    return{restrict: "E", templateUrl: "views/directives/photos-info.html", transclude: !0, replace: !0, scope: {userName: "@", newGallery: "="}, controller: function ($scope, $q, $stateParams, $state, $upload, DataService) {
        $scope.newGallery.Photos = [], $scope.delete = function (p, index) {
            DataService.deletePhoto($scope.newGallery.Id, p.Id).then(function () {
                $scope.newGallery.Photos.splice(index, 1)
            })
        }, $scope.onFileSelect = function ($files) {
            $scope.up($files, 0)
        }, $scope.up = function ($files, index) {
            if (index != $files.length) {
                var file = $files[index];
                $upload.upload({url: "/BreederPersonal/AddPictureNewGallery", data: {Title: $scope.newGallery.Title}, file: file}).progress(function () {
                }).success(function (data) {
                    var photo = {Id: data.PhotoId, Caption: "Picture", FilePath: data.FileName};
                    $scope.newGallery.Photos.push(photo), $scope.newGallery.Id = data.GalleryId, $scope.up($files, index + 1)
                })
            }
        }
    }}
}, previousPuppies = function () {
    return{restrict: "E", templateUrl: "views/directives/previous-puppies.html", transclude: !0, replace: !0, scope: {ctrl: "=", text: "@", func: "&"}, link: function () {
    }}
}, profileButtons = function () {
    return{restrict: "E", templateUrl: "views/directives/profile-buttons.html", transclude: !0, replace: !0, link: function () {
    }}
}, spinDiv = function () {
    return{restrict: "E", templateUrl: "views/directives/spin-div.html", transclude: !0, replace: !0, scope: {ctrl: "=", text: "@", func: "&"}, link: function () {
    }}
}, BoolString = function () {
    function BoolString() {
    }

    return BoolString.filter = function (value) {
        return value === !0 ? "Yes" : "No"
    }, BoolString
}(), GalleryActive = function () {
    function GalleryActive() {
    }

    return GalleryActive.filter = function (Galleries, isActive) {
        var finalArray = [];
        return Galleries.forEach(function (gallery) {
            gallery.IsActive === isActive && finalArray.push(gallery)
        }), finalArray
    }, GalleryActive
}(), SpacesToDashes = function () {
    function SpacesToDashes() {
    }

    return SpacesToDashes.filter = function (value) {
        return value.replace(/ /g, "-")
    }, SpacesToDashes
}(), TitleLength = function () {
    function TitleLength() {
    }

    return TitleLength.filter = function (value, len) {
        return value.length <= len ? value : value.substr(0, len) + "..."
    }, TitleLength
}(), Gallery = function () {
    function Gallery() {
    }

    return Gallery
}(), BreederProfile = function () {
    function BreederProfile() {
    }

    return BreederProfile
}(), CopyProfileService = function () {
    function CopyProfileService() {
        this.BreederProfile = new BreederProfile
    }

    return CopyProfileService.prototype.GetProfileClone = function () {
        var dolly = new BreederProfile;
        for (var key in this.BreederProfile)this.BreederProfile.hasOwnProperty(key) && (dolly[key] = this.BreederProfile[key]);
        return dolly
    }, CopyProfileService.prototype.SetProfile = function (breederProfile) {
        this.BreederProfile = breederProfile
    }, CopyProfileService
}(), DataService = function () {
    function DataService($http, $q) {
        this.$http = $http, this.$q = $q
    }

    return DataService.prototype.getProfile = function () {
        var d = this.$q.defer();
        return this.$http.get("/BreederPersonal/GetProfile").success(function (result) {
            d.resolve(result)
        }).error(function () {
            d.reject()
        }), d.promise
    }, DataService.prototype.updateProfile = function (t) {
        var d = this.$q.defer();
        return this.$http.post("/BreederPersonal/UpdateUserProfile", {BreederViewModel: t}).success(function () {
            d.resolve()
        }).error(function () {
            d.reject()
        }), d.promise
    }, DataService.prototype.deletePhoto = function (galleryId, photoId) {
        var d = this.$q.defer();
        return this.$http.post("/BreederPersonal/DeletePhoto", {deletePhoto: {GalleryId: galleryId, PhotoId: photoId}}).success(function () {
            d.resolve()
        }).error(function () {
            d.reject()
        }), d.promise
    }, DataService.prototype.updateCaption = function (galleryId, photoId, caption) {
        var d = this.$q.defer();
        return this.$http.post("/BreederPersonal/UpdateCaption", {photoCaption: {GalleryId: galleryId, PhotoId: photoId, Caption: caption}}).success(function () {
            d.resolve()
        }).error(function () {
            d.reject()
        }), d.promise
    }, DataService.prototype.updateTitle = function (galleryId, title) {
        var d = this.$q.defer();
        return this.$http.post("/BreederPersonal/UpdateTitle", {galleryTitle: {GalleryId: galleryId, Title: title}}).success(function () {
            d.resolve()
        }).error(function () {
            d.reject()
        }), d.promise
    }, DataService.prototype.deleteGallery = function (galleryId) {
        var d = this.$q.defer();
        return this.$http.post("/BreederPersonal/DeleteGallery", {galleryId: galleryId}).success(function () {
            d.resolve()
        }).error(function () {
            d.reject()
        }), d.promise
    }, DataService.prototype.shareGallery = function (galleryId) {
        var d = this.$q.defer();
        return this.$http.post("/BreederPersonal/ShareGallery", {galleryId: galleryId}).success(function () {
            d.resolve()
        }).error(function () {
            d.reject()
        }), d.promise
    }, DataService.prototype.updateGallery = function (gallery) {
        var d = this.$q.defer();
        return this.$http.post("/BreederPersonal/UpdateGallery", {gallery: gallery}).success(function () {
            d.resolve()
        }).error(function () {
            d.reject()
        }), d.promise
    }, DataService.prototype.getGalleries = function () {
        var d = this.$q.defer();
        return this.$http.get("/BreederPersonal/GetGalleries").success(function (result) {
            d.resolve(result)
        }).error(function () {
            d.reject()
        }), d.promise
    }, DataService.prototype.updateGalleries = function (t) {
        var d = this.$q.defer();
        return this.$http.post("/BreederPersonal/UpdateGalleries", {Galleries: t}).success(function () {
            d.resolve()
        }).error(function () {
            d.reject()
        }), d.promise
    }, DataService
}(), GalleryService = function () {
    function GalleryService() {
    }

    return GalleryService.prototype.GetGalleryClone = function () {
        var dolly = new Gallery;
        for (var key in this.Gallery)this.Gallery.hasOwnProperty(key) && (dolly[key] = this.Gallery[key]);
        return dolly
    }, GalleryService.prototype.SetGallery = function (gallery) {
        this.Gallery = gallery
    }, GalleryService
}(), profile = angular.module("profile", ["ui.router", "angularFileUpload", "ngAnimate", "ui.bootstrap.modal", "ui.bootstrap.tpls"]);
profile.filter("boolString", function () {
    return function (value) {
        return BoolString.filter(value)
    }
}), profile.filter("spacesToDashes", function () {
    return function (value) {
        return SpacesToDashes.filter(value)
    }
}), profile.filter("titleLength", function () {
    return function (value, len) {
        return TitleLength.filter(value, len)
    }
}), profile.filter("galleryActive", function () {
    return function (Galleries, isActive) {
        return GalleryActive.filter(Galleries, isActive)
    }
}), profile.service("CopyProfileService", CopyProfileService), profile.service("GalleryService", GalleryService), profile.directive("profileButtons", profileButtons), profile.directive("aboutInfoEdit", aboutInfoEdit), profile.directive("detailsInfo", detailsInfo), profile.directive("detailsInfoEdit", detailsInfoEdit), profile.directive("litters", litters), profile.directive("previousPuppies", previousPuppies), profile.directive("photosInfo", photosInfo), profile.directive("photoGalleries", photoGalleries), profile.directive("photoGallery", photoGallery), profile.directive("photoGalleryEdit", photoGalleryEdit), profile.directive("spinDiv", spinDiv), profile.directive("aboutInfo", aboutInfo), profile.directive("breederDetails", breederDetails), profile.controller("PhotosCtrl", PhotosCtrl), profile.value("toastr", toastr), profile.service("DataService", DataService), profile.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/profile/about"), $stateProvider.state("profile", {"abstract": !0, url: "/profile", templateUrl: "../views/profile.html"}).state("profile.about1", {url: "/about", templateUrl: "../views/profile-about.html"}).state("profile.about1.edit", {url: "/edit", templateUrl: "../views/profile-about-edit.html"}).state("profile.photos2", {url: "/photos", resolve: {data: function (DataService) {
        return DataService.getGalleries()
    }}, controller: "PhotosCtrl", templateUrl: "../views/profile-photos.html"}).state("profile.photos2.galleries", {url: "/gallery/:id", template: "<div ui-view><photo-gallery></photo-gallery></div>"}).state("profile.photos2.galleries.edit", {url: "/edit", template: "<photo-gallery-edit></photo-gallery-edit>"}).state("profile.photos2.edit", {url: "/edit", templateUrl: "../views/profile-photosEdit.html"}).state("profile.puppies3", {url: "/puppies", templateUrl: "../views/profile-puppies.html"}).state("profile.puppies3.edit", {url: "/edit", templateUrl: "../views/profile-puppiesEdit.html"}).state("profile.details4", {url: "/details", templateUrl: "../views/profile-details.html"}).state("profile.details4.edit", {url: "/edit", templateUrl: "../views/profile-detailsEdit.html"}).state("profile.testimonials5", {url: "/testimonials", templateUrl: "../views/profile-testimonials.html"}).state("profile.testimonials5.edit", {url: "/edit", templateUrl: "../views/profile-testimonialsEdit.html"})
}]);