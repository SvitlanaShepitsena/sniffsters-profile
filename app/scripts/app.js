var profile = angular.module("profile", ['ui.router', 'angularFileUpload', 'ngAnimate', 'ui.bootstrap.modal', 'ui.bootstrap', 'ui.bootstrap.tpls', 'firebase']);

profile.filter('boolString', function () {
    return function (value) {
        return BoolString.filter(value);
    };
});

profile.filter('spacesToDashes', function () {
    return function (value) {
        return SpacesToDashes.filter(value);
    };
});
profile.filter('titleLength', function () {
    return function (value, len) {
        return TitleLength.filter(value, len);
    };
});
profile.filter('galleryActive', function () {
    return function (Galleries, isActive) {
        return GalleryActive.filter(Galleries, isActive);
    };
});

profile.service("CopyProfileService", CopyProfileService);
profile.service("GalleryService", GalleryService);

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
profile.controller("NavCtrl", NavCtrl);

profile.value("toastr", toastr);
profile.service("DataService", DataService);

profile.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/messages");

    $stateProvider.state("user", {
        abstract: true,
        templateUrl: "../views/profile-side-bar.html"
    }).state("user.profile", {
        abstract: true,
        url: "/profile",
        controller: IndexCtrl,
        templateUrl: "../views/profile.html"
    }).state("user.profile.about1", {
        url: "/about",
        templateUrl: "../views/profile-about.html"
    }).state("user.profile.about1.edit", {
        url: "/edit",
        templateUrl: "../views/profile-about-edit.html"
    }).state("user.profile.photos2", {
        url: "/photos",
        controller: "PhotosCtrl",
        templateUrl: "../views/profile-photos.html"
    }).state("user.profile.photos2.galleries", {
        url: "/gallery/:id",
        template: "<div ui-view><photo-gallery></photo-gallery></div>"
    }).state("user.profile.photos2.galleries.edit", {
        url: "/edit",
        template: "<photo-gallery-edit></photo-gallery-edit>"
    }).state("user.profile.puppies3", {
        url: "/puppies",
        controller: "PuppiesCtrl",
        templateUrl: "../views/profile-puppies.html"
    }).state("user.profile.puppies3.litter", {
        url: "/litter/:id",
        templateUrl: "../views/profile-puppiesLitter.html"
    }).state("user.profile.puppies3.litter.edit", {
        url: "/edit",
        template: "<litter l='puppies.SelectedLitter' user-name='{{index.Id}}'></litter>"
    }).state("user.profile.details4", {
        url: "/details",
        templateUrl: "../views/profile-details.html"
    }).state("user.profile.details4.edit", {
        url: "/edit",
        templateUrl: "../views/profile-detailsEdit.html"
    }).state("user.profile.testimonials5", {
        url: "/testimonials",
        controller: "TestimonialsCtrl",
        templateUrl: "../views/profile-testimonials.html"
    }).state("user.profile.testimonials5.edit", {
        url: "/edit/:id",
        template: "<feedback-edit></feedback-edit>"
    }).state("generate", {
        url: "/generate",
        controller: "GenerateCtrl",
        templateUrl: "../views/generate.html"
    }).state("home", {
        url: "/",
        templateUrl: "../views/home.html"
    }).state("sniff.login", {
        url: "/login",
        controller: "LoginCtrl",
        templateUrl: "../views/login.html"
    }).state("sniff.register", {
        url: "/register",
        controller: "RegisterCtrl",
        templateUrl: "../views/register.html"
    }).state("looking-for-dog", {
        url: "/looking-for-a-dog",
        controller: "LookingForDogCtrl",
        templateUrl: "../views/looking-for-dog.html"
    }).state("sniff", {
        abstract: true,
        templateUrl: "../views/sniff.html"
    }).state("sniff.about", {
        url: "/about",
        controller: "AboutCtrl",
        templateUrl: "../views/about.html"
    }).state("sniff.breeders", {
        url: "/breeders",
        controller: "BreedersCtrl",
        templateUrl: "../views/breeders.html"
    }).state("sniff.dogs", {
        url: "/dogs",
        controller: "DogsCtrl",
        templateUrl: "../views/dogs.html"
    }).state("sniff.explore", {
        url: "/explore",
        controller: "ExploreCtrl",
        templateUrl: "../views/explore.html"
    }).state("sniff.advertise", {
        url: "/advertise",
        controller: "AdvertiseCtrl",
        templateUrl: "../views/advertise.html"
    }).state("sniff.terms", {
        url: "/terms",
        controller: "TermsCtrl",
        templateUrl: "../views/terms.html"
    }).state("sniff.contact", {
        url: "/contact",
        controller: "ContactCtrl",
        templateUrl: "../views/contact.html"
    }).state("sniff.forBreeders", {
        url: "/for-breeders",
        controller: "ForBreedersCtrl",
        templateUrl: "../views/for-breeders.html"
    }).state("user.messages", {
        url: "/messages",
        controller: "user.messagesCtrl",
        templateUrl: "../views/messages.html"
    }).state("user.messages.create", {
        url: "/createMessage",
        controller: "CreateMessageCtrl",
        templateUrl: "../views/createMessage.html"
    }).state("user.messages.trash", {
        url: "/trash",
        controller: "TrashCtrl",
        templateUrl: "../views/trash.html"
    }).state("Nav", {
        url: "/Nav",
        controller: "NavCtrl",
        templateUrl: "../views/Nav.html"
    });
});
