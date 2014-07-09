/// <reference path="directives/BreederDetails.ts" />
/// <reference path="filters/BoolString.ts" />
/// <reference path="directives/aboutInfo.ts" />
/// <reference path="directives/aboutInfoEdit.ts" />
/// <reference path="directives/detailsInfo.ts" />
/// <reference path="directives/detailsInfoEdit.ts" />
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
/// <reference path="filters/GalleryActive.ts" />
/// <reference path="controllers/PuppiesCtrl.ts" />
/// <reference path="directives/litter.ts" />
/// <reference path="directives/litterNew.ts" />
/// <reference path="controllers/TestimonialsCtrl.ts" />
/// <reference path="directives/feedback.ts" />
/// <reference path="directives/feedbackInfo.ts" />
/// <reference path="directives/litterInfo.ts" />
/// <reference path="directives/feedbackEdit.ts" />
/// <reference path="controllers/GenerateCtrl.ts" />
/// <reference path="controllers/HomeCtrl.ts" />
/// <reference path="controllers/AboutCtrl.ts" />
/// <reference path="controllers/BreedersCtrl.ts" />
/// <reference path="controllers/DogsCtrl.ts" />
/// <reference path="controllers/ExploreCtrl.ts" />
/// <reference path="controllers/AdvertiseCtrl.ts" />
/// <reference path="controllers/TermsCtrl.ts" />
/// <reference path="controllers/ContactCtrl.ts" />
/// <reference path="controllers/LookingForDogCtrl.ts" />
/// <reference path="controllers/ForBreedersCtrl.ts" />
/// <reference path="controllers/LoginCtrl.ts" />
/// <reference path="controllers/RegisterCtrl.ts" />
/// <reference path="controllers/MessagesCtrl.ts" />
/// <reference path="controllers/CreateMessageCtrl.ts" />
/// <reference path="controllers/TrashCtrl.ts" />
/// <reference path="directives/newMessage.ts" />
/// <reference path="directives/setter.ts" />
/// <reference path="directives/setterIshome.ts" />
/// <reference path="directives/messageNavMenu.ts" />
/// <reference path="directives/userProfileNav.ts" />
/// <reference path="directives/breederProfileNav.ts" />
//#ref

var profile = angular.module("profile", ['ui.router', 'angularFileUpload', 'ngAnimate', 'ui.bootstrap.modal', 'ui.bootstrap', 'ui.bootstrap.tpls', 'firebase']);

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
profile.filter('galleryActive', () => {
    return (Galleries:IGallery[], isActive:Boolean):IGallery[] => {
        return GalleryActive.filter(Galleries, isActive);
    }
});

//#filt

profile.service("CopyProfileService", CopyProfileService);
profile.service("GalleryService", GalleryService);
//#serv

profile.directive("aboutInfoEdit", aboutInfoEdit);
profile.directive("detailsInfo", detailsInfo);
profile.directive("detailsInfoEdit", detailsInfoEdit);
profile.directive("previousPuppies", previousPuppies);
profile.directive("photosInfo", photosInfo);
profile.directive("photoGalleries", photoGalleries);
profile.directive("photoGallery", photoGallery);
profile.directive("photoGalleryEdit", photoGalleryEdit);
profile.directive("spinDiv", spinDiv);
profile.directive("litter", litter);
profile.directive("litterNew", litterNew);
profile.directive("feedback", feedback);
profile.directive("feedbackInfo", feedbackInfo);
profile.directive("litterInfo", litterInfo);
profile.directive("feedbackEdit", feedbackEdit);
profile.directive("newMessage", newMessage);
profile.directive("setter", setter);
profile.directive("setterIshome", setterIshome);
profile.directive("messageNavMenu", messageNavMenu);
profile.directive("userProfileNav", userProfileNav);
profile.directive("breederProfileNav", breederProfileNav);
//#dir
profile.directive("aboutInfo", aboutInfo);
profile.directive("breederDetails", breederDetails);

profile.controller("PhotosCtrl", PhotosCtrl);
profile.controller("PuppiesCtrl", PuppiesCtrl);
profile.controller("TestimonialsCtrl", TestimonialsCtrl);
profile.controller("GenerateCtrl", GenerateCtrl);
profile.controller("HomeCtrl", HomeCtrl);
profile.controller("AboutCtrl", AboutCtrl);
profile.controller("BreedersCtrl", BreedersCtrl);
profile.controller("DogsCtrl", DogsCtrl);
profile.controller("ExploreCtrl", ExploreCtrl);
profile.controller("AdvertiseCtrl", AdvertiseCtrl);
profile.controller("TermsCtrl", TermsCtrl);
profile.controller("ContactCtrl", ContactCtrl);
profile.controller("LookingForDogCtrl", LookingForDogCtrl);
profile.controller("ForBreedersCtrl", ForBreedersCtrl);
profile.controller("LoginCtrl", LoginCtrl);
profile.controller("RegisterCtrl", RegisterCtrl);
profile.controller("user.messagesCtrl", MessagesCtrl);
profile.controller("CreateMessageCtrl", CreateMessageCtrl);
profile.controller("TrashCtrl", TrashCtrl);
//#ctrl

// TODO: Implement filter
profile.value("toastr", toastr)
profile.service("DataService", DataService);

profile.config(
    ($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise("/messages");

        $stateProvider
            .state("user", {
                abstract: true,
                templateUrl: "../views/profile-side-bar.html"
            })
            .state("user.profile", {
                abstract: true,
                url: "/profile",
                controller: IndexCtrl,
                templateUrl: "../views/profile.html"
            })
            .state("user.profile.about1", {
                url: "/about",
                templateUrl: "../views/profile-about.html"
            })
            .state("user.profile.about1.edit", {
                url: "/edit",
                templateUrl: "../views/profile-about-edit.html"
            })
            .state("user.profile.photos2", {
                url: "/photos",
                controller: "PhotosCtrl",
                templateUrl: "../views/profile-photos.html"
            })
            .state("user.profile.photos2.galleries", {
                url: "/gallery/:id",
                template: "<div ui-view><photo-gallery></photo-gallery></div>"
            })
            .state("user.profile.photos2.galleries.edit", {
                url: "/edit",
                template: "<photo-gallery-edit></photo-gallery-edit>"
            })
            .state("user.profile.puppies3", {
                url: "/puppies",
                controller: "PuppiesCtrl",

                templateUrl: "../views/profile-puppies.html"
            })
            .state("user.profile.puppies3.litter", {
                url: "/litter/:id",
                templateUrl: "../views/profile-puppiesLitter.html"
            })
            .state("user.profile.puppies3.litter.edit", {
                url: "/edit",
                template: "<litter l='puppies.SelectedLitter' user-name='{{index.Id}}'></litter>"
            })
            .state("user.profile.details4", {
                url: "/details",
                templateUrl: "../views/profile-details.html"
            })
            .state("user.profile.details4.edit", {
                url: "/edit",
                templateUrl: "../views/profile-detailsEdit.html"
            })
            .state("user.profile.testimonials5", {
                url: "/testimonials",
                controller: "TestimonialsCtrl",
                templateUrl: "../views/profile-testimonials.html"
            })
            .state("user.profile.testimonials5.edit", {
                url: "/edit/:id",
                template: "<feedback-edit></feedback-edit>"
            })
            .state("generate", {
                url: "/generate",
                controller: "GenerateCtrl",
                templateUrl: "../views/generate.html"
            })

        /**********************
         Home Menu
         ***********************/

            .state("home", {
                url: "/",
                templateUrl: "../views/home.html"
            })

            .state("sniff.login", {
                url: "/login",
                controller: "LoginCtrl",
                templateUrl: "../views/login.html"
            })
            .state("sniff.register", {
                url: "/register",
                controller: "RegisterCtrl",
                templateUrl: "../views/register.html"
            })

            .state("looking-for-dog", {
                url: "/looking-for-a-dog",
                controller: "LookingForDogCtrl",
                templateUrl: "../views/looking-for-dog.html"
            })
            .state("sniff", {
                abstract: true,
                templateUrl: "../views/sniff.html"
            })
            .state("sniff.about", {
                url: "/about",
                controller: "AboutCtrl",
                templateUrl: "../views/about.html"
            })
            .state("sniff.breeders", {
                url: "/breeders",
                controller: "BreedersCtrl",
                templateUrl: "../views/breeders.html"
            })
            .state("sniff.dogs", {
                url: "/dogs",
                controller: "DogsCtrl",
                templateUrl: "../views/dogs.html"
            })
            .state("sniff.explore", {
                url: "/explore",
                controller: "ExploreCtrl",
                templateUrl: "../views/explore.html"
            })
            .state("sniff.advertise", {
                url: "/advertise",
                controller: "AdvertiseCtrl",
                templateUrl: "../views/advertise.html"
            })
            .state("sniff.terms", {
                url: "/terms",
                controller: "TermsCtrl",
                templateUrl: "../views/terms.html"
            })
            .state("sniff.contact", {
                url: "/contact",
                controller: "ContactCtrl",
                templateUrl: "../views/contact.html"
            })
            .state("sniff.forBreeders", {
                url: "/for-breeders",
                controller: "ForBreedersCtrl",
                templateUrl: "../views/for-breeders.html"
            })
        /**********************
         * Messages
         ***********************/


            .state("user.messages", {
                url: "/messages",
                controller: "user.messagesCtrl",
                templateUrl: "../views/messages.html"
            })
            .state("user.messages.create", {
                url: "/createMessage",
                controller: "CreateMessageCtrl",
                templateUrl: "../views/createMessage.html"
            })
            .state("user.messages.trash", {
                url: "/trash",
                controller: "TrashCtrl",
                templateUrl: "../views/trash.html"
            })
//#state
    });

