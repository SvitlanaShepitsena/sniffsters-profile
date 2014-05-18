/// <reference path="models/IBreederProfile.ts" />
/// <reference path="filters/BoolString.ts" />
/// <reference path="services/DataService.ts" />
/// <reference path="services/CopyProfileService.ts" />
/// <reference path="directives/BreederDetails.ts" />

/// <reference path="controllers/EditCtrl.ts" />
/// <reference path="directives/lookerDetails.ts" />
/// <reference path="controllers/AboutCtrl.ts" />
/// <reference path="controllers/PhotosCtrl.ts" />
/// <reference path="controllers/PuppiesCtrl.ts" />
/// <reference path="controllers/DetailsCtrl.ts" />
/// <reference path="controllers/TestimonialsCtrl.ts" />
/// <reference path="directives/aboutInfo.ts" />
//#ref

var profile = angular.module("profile", ['ui.router']);


profile.config(function ($httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});


profile.service("CopyProfileService", CopyProfileService);
profile.filter('boolString', () => {
    return (value:boolean):string => {
        return BoolString.filter(value);
    }
});


profile.directive("lookerDetails", lookerDetails);
profile.directive("aboutInfo", aboutInfo);
//#dir
profile.directive("breederDetails", breederDetails);

profile.controller("EditCtrl", EditCtrl);
profile.controller("AboutCtrl", AboutCtrl);
profile.controller("PhotosCtrl", PhotosCtrl);
profile.controller("PuppiesCtrl", PuppiesCtrl);
profile.controller("DetailsCtrl", DetailsCtrl);
profile.controller("TestimonialsCtrl", TestimonialsCtrl);
//#ctrl

profile.config(function ($httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

profile.value("toastr", toastr)
profile.service("DataService", DataService);

profile.config(
    ["$stateProvider", "$urlRouterProvider",
        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise("/profile/about");

            $stateProvider
                .state("profile", {

                    url: "/profile",
                    templateUrl: "../views/profile.html"

                })

                .state("profile.about", {
                    url: "/about",
                    controller: "AboutCtrl",
                    templateUrl: "../views/profile-about.html"
                })



                .state("profile.photos", {
                    url: "/photos",
                    controller: "PhotosCtrl",
                    templateUrl: "../views/profile-photos.html"
                })


//                .state("profile.puppies", {
//                    url: "/puppies",
//                    controller: "PuppiesCtrl",
//                    templateUrl: "../views/profile-puppies.html"
//                })
//                .state("profile.details", {
//                    url: "/details",
//                    controller: "DetailsCtrl",
//                    templateUrl: "../views/profile-details.html"
//                })
//                .state("profile.testimonials", {
//                    url: "/testimonials",
//                    controller: "TestimonialsCtrl",
//                    templateUrl: "../views/profile-testimonials.html"
//                })
//

//#state
        }]);

