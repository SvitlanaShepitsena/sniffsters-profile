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
/// <reference path="services/GalleryService.ts" />
/// <reference path="filters/TitleLength.ts" />
/// <reference path="directives/spinDiv.ts" />
//#ref

var profile = angular.module("profile", ['ui.router', 'angularFileUpload', 'ngAnimate', 'ui.bootstrap.modal', 'ui.bootstrap.tpls']);

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
profile.filter('titleLength', () => {
    return (value:string, len:number):string => {
        return TitleLength.filter(value, len);
    }
});
//#filt


profile.service("CopyProfileService", CopyProfileService);
profile.service("GalleryService", GalleryService);
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
profile.directive("spinDiv", spinDiv);
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
            .state("profile.about1", {
                url: "/about",
                templateUrl: "../views/profile-about.html",
                resolve: {
                    profile: (DataService:DataService) => {
                        return DataService.getProfile<IBreederProfile>();
                    }
                }
            })
            .state("profile.about1.edit", {
                url: "/edit",
                templateUrl: "../views/profile-about-edit.html"
            })
            .state("profile.photos2", {
                url: "/photos",
                controller: "PhotosCtrl",
                templateUrl: "../views/profile-photos.html",

                resolve: {
                    galleries: (DataService:DataService) => {
                        return DataService.getGalleries()<IGallery>();
                    }
                }
            })
            .state("profile.photos2.galleries", {
                url: "/gallery/:id",
                template: "<div ui-view><photo-gallery></photo-gallery></div>"
            })
            .state("profile.photos2.galleries.edit", {
                url: "/edit",
                template: "<photo-gallery-edit></photo-gallery-edit>"
            })
            .state("profile.photos2.edit", {
                url: "/edit",
                templateUrl: "../views/profile-photosEdit.html"
            })
            .state("profile.puppies3", {
                url: "/puppies",
                templateUrl: "../views/profile-puppies.html"
            })
            .state("profile.puppies3.edit", {
                url: "/edit",
                templateUrl: "../views/profile-puppiesEdit.html"
            })
            .state("profile.details4", {
                url: "/details",
                templateUrl: "../views/profile-details.html"
            })
            .state("profile.details4.edit", {
                url: "/edit",
                templateUrl: "../views/profile-detailsEdit.html"
            })
            .state("profile.testimonials5", {
                url: "/testimonials",
                templateUrl: "../views/profile-testimonials.html"
            })
            .state("profile.testimonials5.edit", {
                url: "/edit",
                templateUrl: "../views/profile-testimonialsEdit.html"
            })
//#state
    });

