/// <reference path="models/IBreederProfile.ts" />
/// <reference path="filters/BoolString.ts" />
/// <reference path="services/DataService.ts" />
/// <reference path="services/CopyProfileService.ts" />
/// <reference path="directives/BreederDetails.ts" />
/// <reference path="controllers/EditCtrl.ts" />
/// <reference path="directives/lookerDetails.ts" />
/// <reference path="controllers/PhotosCtrl.ts" />
/// <reference path="controllers/PuppiesCtrl.ts" />
/// <reference path="controllers/DetailsCtrl.ts" />
/// <reference path="controllers/TestimonialsCtrl.ts" />
/// <reference path="directives/aboutInfo.ts" />
/// <reference path="directives/photosInfo.ts" />
/// <reference path="directives/puppiesInfo.ts" />
/// <reference path="directives/detailsInfo.ts" />
/// <reference path="directives/testimonialsInfo.ts" />
/// <reference path="directives/aboutInfoEdit.ts" />
//#ref
var profile = angular.module("profile", ['ui.router']);

profile.service("CopyProfileService", CopyProfileService);
profile.filter('boolString', function () {
    return function (value) {
        return BoolString.filter(value);
    };
});
profile.directive("photosInfo", photosInfo);
profile.directive("puppiesInfo", puppiesInfo);
profile.directive("detailsInfo", detailsInfo);
profile.directive("testimonialsInfo", testimonialsInfo);
profile.directive("aboutInfoEdit", aboutInfoEdit);

//#dir
profile.directive("lookerDetails", lookerDetails);
profile.directive("aboutInfo", aboutInfo);
profile.directive("breederDetails", breederDetails);

//#ctrl
profile.controller("EditCtrl", EditCtrl);
profile.controller("PhotosCtrl", PhotosCtrl);
profile.controller("PuppiesCtrl", PuppiesCtrl);
profile.controller("DetailsCtrl", DetailsCtrl);
profile.controller("TestimonialsCtrl", TestimonialsCtrl);

// TODO: Implement filter
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
        controller: "EditCtrl",
        templateUrl: "../views/profile-about-edit.html"
    }).state("profile.photos", {
        url: "/photos",
        controller: "PhotosCtrl",
        templateUrl: "../views/profile-photos.html"
    }).state("profile.puppies", {
        url: "/puppies",
        controller: "PuppiesCtrl",
        templateUrl: "../views/profile-puppies.html"
    }).state("profile.details", {
        url: "/details",
        controller: "DetailsCtrl",
        templateUrl: "../views/profile-details.html"
    }).state("profile.testimonials", {
        url: "/testimonials",
        controller: "TestimonialsCtrl",
        templateUrl: "../views/profile-testimonials.html"
    });
    //#state
});
//# sourceMappingURL=app.js.map
