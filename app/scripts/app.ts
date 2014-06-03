/// <reference path="directives/profileButtons.ts" />
/// <reference path="directives/BreederDetails.ts" />
/// <reference path="filters/BoolString.ts" />
/// <reference path="directives/aboutInfo.ts" />
/// <reference path="directives/aboutInfoEdit.ts" />
/// <reference path="directives/detailsInfo.ts" />
/// <reference path="directives/detailsInfoEdit.ts" />
/// <reference path="directives/litters.ts" />
/// <reference path="directives/previousPuppies.ts" />
/// <reference path="directives/photosInfo.ts" />
/// <reference path="controllers/PhotosCtrl.ts" />
/// <reference path="directives/photoGalleries.ts" />
/// <reference path="filters/SpacesToDashes.ts" />
/// <reference path="directives/photoGallery.ts" />
/// <reference path="directives/photoGalleryEdit.ts" />
//#ref

var profile = angular.module("profile", ['ui.router']);

profile.filter('boolString', () => {
    return (value:boolean):string => {
        return BoolString.filter(value);
    }
});
profile.filter('spacesToDashes', () => {
    return (value:string):string => {
        return SpacesToDashes.filter(value);
    }
});
//#filt


profile.service("CopyProfileService", CopyProfileService);
//#serv

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
//#dir
profile.directive("aboutInfo", aboutInfo);
profile.directive("breederDetails", breederDetails);

profile.controller("PhotosCtrl", PhotosCtrl);
//#ctrl

// TODO: Implement filter
profile.value("toastr", toastr)
profile.service("DataService", DataService);

profile.config(
    ($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise("/profile/about");

        $stateProvider
            .state("profile", {
                abstract: true,
                url: "/profile",
                templateUrl: "../views/profile.html"
            })
            .state("profile.about", {
                url: "/about",
                templateUrl: "../views/profile-about.html"
            })
            .state("profile.about.edit", {
                url: "/edit",
                templateUrl: "../views/profile-about-edit.html"
            })
            .state("profile.photos", {
                url: "/photos",
                controller: "PhotosCtrl",
                templateUrl: "../views/profile-photos.html"
            })
            .state("profile.photos.galleries", {
                url: "/gallery/:id",
                controller: "PhotosCtrl",
                template: "<div ui-view><photo-gallery id={{index.Id}} galleries='photosCtrl.Galleries'></photo-gallery></div>"
            })
            .state("profile.photos.galleries.edit", {
                url: "/edit",
                controller: "PhotosCtrl",
                template: "<photo-gallery-edit id={{index.Id}} galleries='photosCtrl.Galleries'></photo-gallery-edit>"
            })
            .state("profile.photos.edit", {
                url: "/edit",
                templateUrl: "../views/profile-photosEdit.html"
            })
            .state("profile.puppies", {
                url: "/puppies",
                templateUrl: "../views/profile-puppies.html"
            })
            .state("profile.puppies.edit", {
                url: "/edit",
                templateUrl: "../views/profile-puppiesEdit.html"
            })
            .state("profile.details", {
                url: "/details",
                templateUrl: "../views/profile-details.html"
            })
            .state("profile.details.edit", {
                url: "/edit",
                templateUrl: "../views/profile-detailsEdit.html"
            })
            .state("profile.testimonials", {
                url: "/testimonials",
                templateUrl: "../views/profile-testimonials.html"
            })
            .state("profile.testimonials.edit", {
                url: "/edit",
                templateUrl: "../views/profile-testimonialsEdit.html"
            })
//#state
    });

