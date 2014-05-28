/// <reference path="controllers/EditCtrl.ts" />
/// <reference path="directives/BreederDetails.ts" />
/// <reference path="filters/BoolString.ts" />
/// <reference path="directives/lookerDetails.ts" />
/// <reference path="controllers/DetailsCtrl.ts" />
/// <reference path="directives/aboutInfo.ts" />
/// <reference path="directives/aboutInfoEdit.ts" />
/// <reference path="directives/detailsInfo.ts" />
/// <reference path="directives/detailsInfoEdit.ts" />
/// <reference path="controllers/TestimonialsCtrl.ts" />
/// <reference path="directives/testimonialsInfo.ts" />
/// <reference path="directives/testimonialsInfoEdit.ts" />
/// <reference path="controllers/TestimonialsEditCtrl.ts" />
/// <reference path="controllers/PuppiesCtrl.ts" />
/// <reference path="controllers/PuppiesEditCtrl.ts" />
/// <reference path="directives/puppiesInfo.ts" />
/// <reference path="directives/puppiesInfoEdit.ts" />
/// <reference path="controllers/PhotosCtrl.ts" />
/// <reference path="controllers/PhotosEditCtrl.ts" />
/// <reference path="directives/photosInfo.ts" />
/// <reference path="directives/photosInfoEdit.ts" />
//#ref

var profile = angular.module("profile", ['ui.router']);

profile.filter('boolString', () => {
    return (value:boolean):string => {
        return BoolString.filter(value);
    }
});
//#filt


profile.service("CopyProfileService", CopyProfileService);
//#serv


profile.directive("aboutInfoEdit", aboutInfoEdit);
profile.directive("detailsInfo", detailsInfo);
profile.directive("detailsInfoEdit", detailsInfoEdit);
profile.directive("testimonialsInfo", testimonialsInfo);
profile.directive("testimonialsInfoEdit", testimonialsInfoEdit);
profile.directive("puppiesInfo", puppiesInfo);
profile.directive("puppiesInfoEdit", puppiesInfoEdit);
profile.directive("photosInfo", photosInfo);
profile.directive("photosInfoEdit", photosInfoEdit);
//#dir
profile.directive("lookerDetails", lookerDetails);
profile.directive("aboutInfo", aboutInfo);
profile.directive("breederDetails", breederDetails);

profile.controller("TestimonialsCtrl", TestimonialsCtrl);
profile.controller("TestimonialsEditCtrl", TestimonialsEditCtrl);
profile.controller("PuppiesCtrl", PuppiesCtrl);
profile.controller("PuppiesEditCtrl", PuppiesEditCtrl);
profile.controller("PhotosCtrl", PhotosCtrl);
profile.controller("PhotosEditCtrl", PhotosEditCtrl);
//#ctrl
profile.controller("EditCtrl", EditCtrl);
profile.controller("DetailsCtrl", DetailsCtrl);

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
//                controller: "EditCtrl",
                templateUrl: "../views/profile-about-edit.html"
            })
            .state("profile.photos", {
                url: "/photos",
                controller: "PhotosCtrl",
                templateUrl: "../views/profile-photos.html"
            })
            .state("profile.photos.edit", {
                url: "/edit",
                controller: "PhotosEditCtrl",
                templateUrl: "../views/profile-photosEdit.html"
            })
            .state("profile.puppies", {
                url: "/puppies",
                controller: "PuppiesCtrl",
                templateUrl: "../views/profile-puppies.html"
            })
            .state("profile.puppies.edit", {
                url: "/edit",
                controller: "PuppiesEditCtrl",
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
                controller: "TestimonialsCtrl",
                templateUrl: "../views/profile-testimonials.html"
            })
            .state("profile.testimonials.edit", {
                url: "/edit",
                controller: "TestimonialsEditCtrl",
                templateUrl: "../views/profile-testimonialsEdit.html"
            })
//#state
    });

