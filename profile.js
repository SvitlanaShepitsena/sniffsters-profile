var IndexCtrl = function () {
    function IndexCtrl($scope, $location, $rootScope, $window, $state, toastr, DataService, CopyProfileService) {
        var _this = this;
        this.$scope = $scope, this.$rootScope = $rootScope, this.$window = $window, this.$state = $state, this.toastr = toastr, this.DataService = DataService, this.CopyProfileService = CopyProfileService, this.url = "about", $scope.navigate = function (menuIndex) {
            $scope.slide = _this.animationDirection(menuIndex), 1 == menuIndex && (_this.menuIndex = 1, $location.url("/profile/about")), 2 == menuIndex && (_this.menuIndex = 2, $location.url("/profile/photos")), 3 == menuIndex && (_this.url = "puppies", _this.menuIndex = 3, $location.url("/profile/puppies")), 4 == menuIndex && (_this.url = "details", _this.menuIndex = 4, $location.url("/profile/details")), 5 == menuIndex && (_this.url = "testimonials", _this.menuIndex = 5, $location.url("/profile/testimonials"))
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

    return IndexCtrl.prototype.animationDirection = function (menuIndex) {
        return menuIndex > this.menuIndex ? "slide-left" : "slide-right"
    }, IndexCtrl.prototype.SaveKennelName = function () {
        var breederProfileOriginal = this.CopyProfileService.GetProfileClone();
        breederProfileOriginal.KennelName = this.BreederProfileEdit.KennelName, breederProfileOriginal.Story = this.BreederProfileEdit.Story, this.Save(breederProfileOriginal)
    }, IndexCtrl.prototype.SaveAboutParents = function () {
        var breederProfileOriginal = this.CopyProfileService.GetProfileClone();
        breederProfileOriginal.Parents = this.BreederProfileEdit.Parents, breederProfileOriginal.Girls = this.BreederProfileEdit.Girls, breederProfileOriginal.Boys = this.BreederProfileEdit.Boys, console.log(breederProfileOriginal), this.Save(breederProfileOriginal)
    }, IndexCtrl.prototype.SaveAddInfo = function () {
        var breederProfileOriginal = this.CopyProfileService.GetProfileClone();
        breederProfileOriginal.AddInfo = this.BreederProfileEdit.AddInfo, this.Save(breederProfileOriginal)
    }, IndexCtrl.prototype.SavePersonalInfo = function () {
        var breederProfileOriginal = this.CopyProfileService.GetProfileClone();
        breederProfileOriginal.KennelName = this.BreederProfileEdit.KennelName, breederProfileOriginal.Website = this.BreederProfileEdit.Website, breederProfileOriginal.Email = this.BreederProfileEdit.Email, breederProfileOriginal.Phone = this.BreederProfileEdit.Phone, this.Save(breederProfileOriginal)
    }, IndexCtrl.prototype.SaveLocation = function () {
        var breederProfileOriginal = this.CopyProfileService.GetProfileClone();
        breederProfileOriginal.City = this.BreederProfileEdit.City, breederProfileOriginal.Zip = this.BreederProfileEdit.Zip, breederProfileOriginal.State = this.BreederProfileEdit.State, this.Save(breederProfileOriginal)
    }, IndexCtrl.prototype.SaveSpecifics = function () {
        var breederProfileOriginal = this.CopyProfileService.GetProfileClone();
        breederProfileOriginal.Certifications = this.BreederProfileEdit.Certifications, breederProfileOriginal.Insurances = this.BreederProfileEdit.Insurances, this.Save(breederProfileOriginal)
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
}(), PuppiesCtrl = function () {
    function PuppiesCtrl($scope, litters, $state, toastr, DataService, CopyProfileService) {
        this.$scope = $scope, this.$state = $state, this.toastr = toastr, this.DataService = DataService, this.CopyProfileService = CopyProfileService, $scope.index.url = "puppies", $scope.puppies = this, this.LittersNew = [], this.Litters = litters
    }

    return PuppiesCtrl.prototype.addNewLitter = function () {
        this.LittersNew.push(new Litter)
    }, PuppiesCtrl.prototype.saveLitters = function () {
        var _this = this, indexNew = 0;
        this.LittersNew.forEach(function (litter) {
            _this.Litters.push(litter), _this.LittersNew.splice(indexNew++, 1)
        }), this.DataService.saveLitters(this.Litters).then(function () {
            _this.ShowSuccess("You changes have been saved to Db")
        }, function () {
            _this.ShowSuccess("You changes have not been saved to Db. Check please you connection.")
        })
    }, PuppiesCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, PuppiesCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, PuppiesCtrl
}(), TestimonialsCtrl = function () {
    function TestimonialsCtrl($scope, feedbacks, $state, toastr, DataService, CopyProfileService) {
        this.$scope = $scope, this.$state = $state, this.toastr = toastr, this.DataService = DataService, this.CopyProfileService = CopyProfileService, $scope.index.url = "testimonials", $scope.testimonials = this, this.Feedbacks = feedbacks
    }

    return TestimonialsCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, TestimonialsCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, TestimonialsCtrl
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
        scope.ResetAllFields = function () {
            scope.ctrl.BreederProfileEdit.KennelName = "", scope.ctrl.BreederProfileEdit.Website = "", scope.ctrl.BreederProfileEdit.Email = "", scope.ctrl.BreederProfileEdit.Phone = "", scope.ctrl.BreederProfileEdit.Location = "", scope.ctrl.BreederProfileEdit.State = "", scope.ctrl.BreederProfileEdit.Zip = "", scope.ctrl.BreederProfileEdit.City = "", scope.ctrl.BreederProfileEdit.Shipping = !1
        }, scope.SaveKennelName = function () {
            var breederProfileOriginal = scope.ctrl.GetClone();
            breederProfileOriginal.KennelName = scope.ctrl.BreederProfileEdit.KennelName, breederProfileOriginal.Story = scope.ctrl.BreederProfileEdit.Story, scope.ctrl.Save(breederProfileOriginal)
        }
    }}
}, feedback = function () {
    return{restrict: "E", templateUrl: "views/directives/feedback.html", replace: !0, scope: {f: "=", text: "@", func: "&"}, link: function () {
    }}
}, feedbackInfo = function () {
    return{restrict: "E", templateUrl: "views/directives/feedback-info.html", transclude: !0, replace: !0, scope: {ctrl: "=", text: "@", func: "&"}, link: function () {
    }}
}, litter = function () {
    return{restrict: "E", templateUrl: "views/directives/litter.html", transclude: !0, replace: !0, scope: {l: "=", userName: "@"}, controller: function ($scope, DataService, $modal, $upload) {
        $scope.onFileSelect = function ($files) {
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                $scope.upload = $upload.upload({url: "/BreederPersonal/AddLitterPicture", data: {gallery: $scope.l.Id}, file: file}).progress(function () {
                }).success(function (data) {
                    $scope.l.Photos.push(data)
                })
            }
        }, $scope.deleteLitterPhoto = function (litterId, photoId, index) {
            var modalInstance = $modal.open({template: '<div><div class="modal-body">Delete this photo?</div><div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">OK</button><button class="btn btn-warning" ng-click="cancel()">Cancel</button></div></div>', size: "sm", controller: function ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close(!0)
                }, $scope.cancel = function () {
                    $modalInstance.close(!1)
                }
            }});
            modalInstance.result.then(function (confirmation) {
                confirmation && DataService.deleteLitterPhoto(litterId, photoId).then(function () {
                    $scope.l.Photos.splice(index, 1)
                })
            })
        }, $scope.today = function () {
            $scope.dt = new Date
        }, $scope.today(), $scope.clear = function () {
            $scope.dt = null
        }, $scope.open = function ($event) {
            $event.preventDefault(), $event.stopPropagation(), $scope.opened = !0
        }, $scope.initDate = new Date, $scope.formats = ["dd-MMMM-yyyy", "yyyy/MM/dd", "dd.MM.yyyy", "shortDate"], $scope.format = $scope.formats[2]
    }, link: function () {
    }}
}, litterNew = function () {
    return{restrict: "E", templateUrl: "views/directives/litter-new.html", transclude: !0, replace: !0, scope: {l: "=", userName: "@", text: "@", func: "&"}, controller: function ($scope, $q, DataService, $modal, $upload) {
        $scope.onNewFileSelect = function ($files) {
            $scope.up($files, 0)
        }, $scope.up = function ($files, index) {
            if (index != $files.length) {
                var file = $files[index];
                $upload.upload({url: "/BreederPersonal/AddPictureNewLitter", data: {Title: $scope.l.Title}, file: file}).progress(function () {
                }).success(function (data) {
                    var photo = {Id: data.PhotoId, Caption: "Picture", FilePath: data.FileName};
                    $scope.l.Photos.push(photo), $scope.l.Id = data.GalleryId, $scope.up($files, index + 1)
                })
            }
        }, $scope.deleteLitterPhoto = function (litterId, photoId, index) {
            var modalInstance = $modal.open({template: '<div><div class="modal-body">Delete this photo?</div><div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">OK</button><button class="btn btn-warning" ng-click="cancel()">Cancel</button></div></div>', size: "sm", controller: function ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close(!0)
                }, $scope.cancel = function () {
                    $modalInstance.close(!1)
                }
            }});
            modalInstance.result.then(function (confirmation) {
                confirmation && DataService.deleteLitterPhoto(litterId, photoId).then(function () {
                    $scope.l.Photos.splice(index, 1)
                })
            })
        }, $scope.today = function () {
            $scope.dt = new Date
        }, $scope.today(), $scope.clear = function () {
            $scope.dt = null
        }, $scope.open = function ($event) {
            $event.preventDefault(), $event.stopPropagation(), $scope.opened = !0
        }, $scope.initDate = new Date, $scope.formats = ["dd-MMMM-yyyy", "yyyy/MM/dd", "dd.MM.yyyy", "shortDate"], $scope.format = $scope.formats[2]
    }, link: function () {
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
}(), Feedback = function () {
    function Feedback() {
    }

    return Feedback
}(), Gallery = function () {
    function Gallery() {
    }

    return Gallery
}(), BreederProfile = function () {
    function BreederProfile() {
    }

    return BreederProfile
}(), Litter = function () {
    function Litter() {
        this.Photos = []
    }

    return Litter
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
    }, DataService.prototype.getLitters = function () {
        var d = this.$q.defer();
        return this.$http.get("/BreederPersonal/GetLitters").success(function (result) {
            d.resolve(result)
        }).error(function () {
            d.reject()
        }), d.promise
    }, DataService.prototype.getFeedbacks = function () {
        var d = this.$q.defer();
        return this.$http.get("/BreederPersonal/GetFeedbacks").success(function (result) {
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
    }, DataService.prototype.saveLitters = function (litters) {
        var d = this.$q.defer();
        return this.$http.post("/BreederPersonal/SaveLitters", {litters: litters}).success(function () {
            d.resolve()
        }).error(function () {
            d.reject()
        }), d.promise
    }, DataService.prototype.deleteLitterPhoto = function (galleryId, photoId) {
        var d = this.$q.defer();
        return this.$http.post("/BreederPersonal/DeleteLitterPhoto", {deletePhoto: {GalleryId: galleryId, PhotoId: photoId}}).success(function () {
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
}(), profile = angular.module("profile", ["ui.router", "angularFileUpload", "ngAnimate", "ui.bootstrap.modal", "ui.bootstrap", "ui.bootstrap.tpls"]);
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
}), profile.service("CopyProfileService", CopyProfileService), profile.service("GalleryService", GalleryService), profile.directive("aboutInfoEdit", aboutInfoEdit), profile.directive("detailsInfo", detailsInfo), profile.directive("detailsInfoEdit", detailsInfoEdit), profile.directive("previousPuppies", previousPuppies), profile.directive("photosInfo", photosInfo), profile.directive("photoGalleries", photoGalleries), profile.directive("photoGallery", photoGallery), profile.directive("photoGalleryEdit", photoGalleryEdit), profile.directive("spinDiv", spinDiv), profile.directive("litter", litter), profile.directive("litterNew", litterNew), profile.directive("feedback", feedback), profile.directive("feedbackInfo", feedbackInfo), profile.directive("aboutInfo", aboutInfo), profile.directive("breederDetails", breederDetails), profile.controller("PhotosCtrl", PhotosCtrl), profile.controller("PuppiesCtrl", PuppiesCtrl), profile.controller("TestimonialsCtrl", TestimonialsCtrl), profile.value("toastr", toastr), profile.service("DataService", DataService), profile.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/profile/about"), $stateProvider.state("profile", {"abstract": !0, url: "/profile", templateUrl: "../views/profile.html"}).state("profile.about1", {url: "/about", templateUrl: "../views/profile-about.html"}).state("profile.about1.edit", {url: "/edit", templateUrl: "../views/profile-about-edit.html"}).state("profile.photos2", {url: "/photos", resolve: {data: function (DataService) {
        return DataService.getGalleries()
    }}, controller: "PhotosCtrl", templateUrl: "../views/profile-photos.html"}).state("profile.photos2.galleries", {url: "/gallery/:id", template: "<div ui-view><photo-gallery></photo-gallery></div>"}).state("profile.photos2.galleries.edit", {url: "/edit", template: "<photo-gallery-edit></photo-gallery-edit>"}).state("profile.photos2.edit", {url: "/edit", templateUrl: "../views/profile-photosEdit.html"}).state("profile.puppies3", {url: "/puppies", controller: "PuppiesCtrl", resolve: {litters: function (DataService) {
        return DataService.getLitters()
    }}, templateUrl: "../views/profile-puppies.html"}).state("profile.puppies3.edit", {url: "/edit", templateUrl: "../views/profile-puppiesEdit.html"}).state("profile.details4", {url: "/details", templateUrl: "../views/profile-details.html"}).state("profile.details4.edit", {url: "/edit", templateUrl: "../views/profile-detailsEdit.html"}).state("profile.testimonials5", {url: "/testimonials", resolve: {feedbacks: function (DataService) {
        return DataService.getFeedbacks()
    }}, controller: "TestimonialsCtrl", templateUrl: "../views/profile-testimonials.html"})
}]);