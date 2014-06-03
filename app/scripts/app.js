var profile = angular.module("profile", ['ui.router']);

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

profile.service("CopyProfileService", CopyProfileService);

profile.directive("profileButtons", profileButtons);

profile.directive("aboutInfoEdit", aboutInfoEdit);
profile.directive("detailsInfo", detailsInfo);
profile.directive("detailsInfoEdit", detailsInfoEdit);
profile.directive("litters", litters);
profile.directive("previousPuppies", previousPuppies);
profile.directive("photosInfo", photosInfo);
profile.directive("photoGalleries", photoGalleries);
profile.directive("photoGallery", photoGallery);

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
    }).state("profile.about", {
        url: "/about",
        templateUrl: "../views/profile-about.html"
    }).state("profile.about.edit", {
        url: "/edit",
        templateUrl: "../views/profile-about-edit.html"
    }).state("profile.photos", {
        url: "/photos",
        controller: "PhotosCtrl",
        templateUrl: "../views/profile-photos.html"
    }).state("profile.photos.galleries", {
        url: "/gallery/:id",
        controller: "PhotosCtrl",
        template: "<div ui-view><photo-gallery galleries='photosCtrl.Galleries'></photo-gallery></div>"
    }).state("profile.photos.edit", {
        url: "/edit",
        templateUrl: "../views/profile-photosEdit.html"
    }).state("profile.puppies", {
        url: "/puppies",
        templateUrl: "../views/profile-puppies.html"
    }).state("profile.puppies.edit", {
        url: "/edit",
        templateUrl: "../views/profile-puppiesEdit.html"
    }).state("profile.details", {
        url: "/details",
        templateUrl: "../views/profile-details.html"
    }).state("profile.details.edit", {
        url: "/edit",
        templateUrl: "../views/profile-detailsEdit.html"
    }).state("profile.testimonials", {
        url: "/testimonials",
        templateUrl: "../views/profile-testimonials.html"
    }).state("profile.testimonials.edit", {
        url: "/edit",
        templateUrl: "../views/profile-testimonialsEdit.html"
    });
});
