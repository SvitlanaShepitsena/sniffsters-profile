/// <reference path="controllers/EditCtrl.ts" />
/// <reference path="directives/BreederDetails.ts" />
/// <reference path="filters/BoolString.ts" />
/// <reference path="directives/lookerDetails.ts" />
/// <reference path="controllers/PhotosCtrl.ts" />
/// <reference path="controllers/PuppiesCtrl.ts" />
/// <reference path="controllers/TestimonialsCtrl.ts" />
/// <reference path="directives/aboutInfo.ts" />
/// <reference path="directives/photosInfo.ts" />
/// <reference path="directives/puppiesInfo.ts" />
/// <reference path="directives/detailsInfo.ts" />
/// <reference path="directives/testimonialsInfo.ts" />
/// <reference path="directives/aboutInfoEdit.ts" />
/// <reference path="directives/myDirective.ts" />
/// <reference path="controllers/TestCtrl.ts" />
/// <reference path="controllers/DetailsCtrl.ts" />
/// <reference path="directives/userInfoEdit.ts" />
//#ref

var profile = angular.module("profile", ['ui.router']);

//#serv


profile.service("CopyProfileService", CopyProfileService);
profile.filter('boolString', () => {
    return (value:boolean):string => {
        return BoolString.filter(value);
    }
});
profile.directive("photosInfo", photosInfo);
profile.directive("puppiesInfo", puppiesInfo);
profile.directive("detailsInfo", detailsInfo);
profile.directive("testimonialsInfo", testimonialsInfo);
profile.directive("aboutInfoEdit", aboutInfoEdit);
profile.directive("myDirective", myDirective);
profile.directive("userInfoEdit", userInfoEdit);
//#dir
profile.directive("lookerDetails", lookerDetails);
profile.directive("aboutInfo", aboutInfo);
profile.directive("breederDetails", breederDetails);

profile.controller("TestCtrl", TestCtrl);
profile.controller("DetailsCtrl", DetailsCtrl);
//#ctrl
profile.controller("EditCtrl", EditCtrl);
profile.controller("PhotosCtrl", PhotosCtrl);
profile.controller("PuppiesCtrl", PuppiesCtrl);
profile.controller("TestimonialsCtrl", TestimonialsCtrl);

// TODO: Implement filter
profile.value("toastr", toastr)
profile.service("DataService", DataService);

profile.config(
    ($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise("/profile/about");
        $urlRouterProvider.when('/test', '/profile/details');

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
            .state("profile.testimonials", {
                url: "/testimonials",
                controller: "TestimonialsCtrl",
                templateUrl: "../views/profile-testimonials.html"
            })

//#state
    });

