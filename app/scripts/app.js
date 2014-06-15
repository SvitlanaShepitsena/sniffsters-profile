var profile = angular.module("profile", ['ui.router', 'angularFileUpload', 'ngAnimate', 'ui.bootstrap.modal', 'ui.bootstrap.tpls']);

profile.filter('boolString', function () {
    return function (value) {
        return BoolString.filter(value);
    };
});
profile.filter('spacesToDashes', function () {
    return function (value) {
        return SpacesToDashes.filter(value);
    };
});
profile.filter('titleLength', function () {
    return function (value, len) {
        return TitleLength.filter(value, len);
    };
});

profile.service("CopyProfileService", CopyProfileService);
profile.service("GalleryService", GalleryService);

profile.directive("profileButtons", profileButtons);

profile.directive("aboutInfoEdit", aboutInfoEdit);
profile.directive("detailsInfo", detailsInfo);
profile.directive("detailsInfoEdit", detailsInfoEdit);
profile.directive("litters", litters);
profile.directive("previousPuppies", previousPuppies);
profile.directive("photosInfo", photosInfo);
profile.directive("photoGalleries", photoGalleries);
profile.directive("photoGallery", photoGallery);
profile.directive("photoGalleryEdit", photoGalleryEdit);
profile.directive("spinDiv", spinDiv);

profile.directive("aboutInfo", aboutInfo);
profile.directive("breederDetails", breederDetails);

profile.controller("PhotosCtrl", PhotosCtrl);

profile.value("toastr", toastr);
profile.service("DataService", DataService);

profile.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/profile/about");

    $stateProvider.state("profile", {
        abstract: true,
        url: "/profile",
        templateUrl: "../views/profile.html"
    }).state("profile.about1", {
        url: "/about",
        templateUrl: "../views/profile-about.html",
        resolve: {
            profile: function (DataService) {
                return DataService.getProfile();
            }
        }
    }).state("profile.about1.edit", {
        url: "/edit",
        templateUrl: "../views/profile-about-edit.html"
    }).state("profile.photos2", {
        url: "/photos",
        controller: "PhotosCtrl",
        templateUrl: "../views/profile-photos.html",
        resolve: {
            galleries: function (DataService) {
                return DataService.getGalleries()();
            }
        }
    }).state("profile.photos2.galleries", {
        url: "/gallery/:id",
        template: "<div ui-view><photo-gallery></photo-gallery></div>"
    }).state("profile.photos2.galleries.edit", {
        url: "/edit",
        template: "<photo-gallery-edit></photo-gallery-edit>"
    }).state("profile.photos2.edit", {
        url: "/edit",
        templateUrl: "../views/profile-photosEdit.html"
    }).state("profile.puppies3", {
        url: "/puppies",
        templateUrl: "../views/profile-puppies.html"
    }).state("profile.puppies3.edit", {
        url: "/edit",
        templateUrl: "../views/profile-puppiesEdit.html"
    }).state("profile.details4", {
        url: "/details",
        templateUrl: "../views/profile-details.html"
    }).state("profile.details4.edit", {
        url: "/edit",
        templateUrl: "../views/profile-detailsEdit.html"
    }).state("profile.testimonials5", {
        url: "/testimonials",
        templateUrl: "../views/profile-testimonials.html"
    }).state("profile.testimonials5.edit", {
        url: "/edit",
        templateUrl: "../views/profile-testimonialsEdit.html"
    });
});
