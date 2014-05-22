/// <reference path="controllers/EditCtrl.ts" />
/// <reference path="directives/BreederDetails.ts" />
/// <reference path="filters/BoolString.ts" />
/// <reference path="directives/lookerDetails.ts" />
/// <reference path="controllers/PhotosCtrl.ts" />
/// <reference path="controllers/PuppiesCtrl.ts" />
/// <reference path="controllers/DetailsCtrl.ts" />
/// <reference path="controllers/TestimonialsCtrl.ts" />
/// <reference path="directives/aboutInfo.ts" />
/// <reference path="directives/photosInfo.ts" />
/// <reference path="directives/puppiesInfo.ts" />
/// <reference path="directives/testimonialsInfo.ts" />
/// <reference path="directives/aboutInfoEdit.ts" />
/// <reference path="directives/detailsInfo.ts" />
/// <reference path="directives/detailsInfoEdit.ts" />
/// <reference path="controllers/DetailsEditCtrl.ts" />
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


profile.directive("photosInfo", photosInfo);
profile.directive("puppiesInfo", puppiesInfo);
profile.directive("testimonialsInfo", testimonialsInfo);
profile.directive("aboutInfoEdit", aboutInfoEdit);
profile.directive("detailsInfo", detailsInfo);
profile.directive("detailsInfoEdit", detailsInfoEdit);
//#dir
profile.directive("lookerDetails", lookerDetails);
profile.directive("aboutInfo", aboutInfo);
profile.directive("breederDetails", breederDetails);

profile.controller("DetailsEditCtrl", DetailsEditCtrl);
//#ctrl
profile.controller("EditCtrl", EditCtrl);
profile.controller("PhotosCtrl", PhotosCtrl);
profile.controller("PuppiesCtrl", PuppiesCtrl);
profile.controller("DetailsCtrl", DetailsCtrl);
profile.controller("TestimonialsCtrl", TestimonialsCtrl);

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
                controller: "EditCtrl",
                templateUrl: "../views/profile-about-edit.html"
            })
            .state("profile.photos", {
                url: "/photos",
                controller: "PhotosCtrl",
                templateUrl: "../views/profile-photos.html"
            })
            .state("profile.puppies", {
                url: "/puppies",
                controller: "PuppiesCtrl",
                templateUrl: "../views/profile-puppies.html"
            })
            .state("profile.details", {
                url: "/details",
                controller: "DetailsCtrl",
                templateUrl: "../views/profile-details.html"
            })
            .state("profile.details.edit", {
                url: "/edit",
                controller: "DetailsEditCtrl",
                templateUrl: "../views/profile-detailsEdit.html"
            })
            .state("profile.testimonials", {
                url: "/testimonials",
                controller: "TestimonialsCtrl",
                templateUrl: "../views/profile-testimonials.html"
            })


//#state
    });

