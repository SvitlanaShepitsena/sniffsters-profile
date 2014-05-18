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
/// <reference path="controllers/AbouteditCtrl.ts" />
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
profile.controller("AbouteditCtrl", AbouteditCtrl);
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
                    abstract: true,
                    url: "/profile",
                    views: {

                        "main": {
                            templateUrl: "../views/profile.html"

                        },
                        "details": {
                            template: " <div ui-view='submenu'> <breeder-details ctrl = 'index'></breeder-details></div>"

                        }
                    }
                })

                .state("profile.about", {
                    url: "/about",
                    views: {
                        'central': {

                            templateUrl: "../views/profile-about.html"
                        }
                    }

                })
                .state("profile.about.change", {
                    url: "/change",
                   views:{
                       'change':{

                           controller: "AbouteditCtrl",
                           templateUrl: "../views/profile-aboutedit.html"
                       }
                   }
                })

                .state("profile.about.edit", {
                    url: "^/mydetails/edit",
                    views: {
                        "details@": {

                            controller: "EditCtrl",
                            template: "<breeder-details-edit ctrl='edit'></breeder-details-edit>"
                        }
                    }
                })

                .state("profile.photos", {
                    url: "/photos",
                    views: {
                        'central': {

                            controller: "PhotosCtrl",
                            templateUrl: "../views/profile-photos.html"
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
//				.state("profile.aboutinfo", {
//					url: "/aboutinfo",
//					controller:"AboutinfoCtrl",
//					templateUrl: "../views/profile-aboutinfo.html"
//				})
//                .state("profile.aboutinfo", {
//                    url: "",
//                    views:{
//                        'main@':{
//
//                            controller: "AboutinfoCtrl",
//                            templateUrl: "../views/profile-aboutinfo.html"
//                        }
//                    }

//                })

//#state
        }]);

