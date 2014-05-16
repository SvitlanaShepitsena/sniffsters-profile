/// <reference path="models/IBreederProfile.ts" />
/// <reference path="filters/BoolString.ts" />
/// <reference path="services/DataService.ts" />
/// <reference path="services/CopyProfileService.ts" />
/// <reference path="directives/BreederDetails.ts" />
/// <reference path="directives/breederDetailsEdit.ts" />

/// <reference path="controllers/EditCtrl.ts" />
/// <reference path="directives/lookerDetails.ts" />
/// <reference path="controllers/AboutCtrl.ts" />
/// <reference path="controllers/PhotosCtrl.ts" />
/// <reference path="controllers/PuppiesCtrl.ts" />
/// <reference path="controllers/DetailsCtrl.ts" />
/// <reference path="controllers/TestimonialsCtrl.ts" />
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
//#dir
profile.directive("breederDetails", breederDetails);
profile.directive("breederDetailsEdit", breederDetailsEdit);

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
                    views: {

                        "main": {
                            templateUrl: "../views/profile.html"

                        },
                        "details": {
                            template: "<breeder-details ctrl = 'index'></breeder-details>"

                        }
                    }
                })


                .state("profile.about", {
                    url: "",
                    views:{
                        'main@':{

                            controller: "AboutCtrl",
                            templateUrl: "../views/profile-about.html"
                        }
                    }

                })
                .state("profile.photos", {
                    url: "/photos",
                    views:{
                        'main@':{

                            controller: "PhotosCtrl",
                            templateUrl: "../views/profile-photos.html"
                        }
                    }

                })


                .state("profile.edit", {
                    url: "^/edit",
                    views: {
                        "details@": {

                            controller: "EditCtrl",
                            template: "<breeder-details-edit ctrl='edit'></breeder-details-edit>"
                        }
                    }
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
//#state
        }]);

