/// <reference path="models/IBreederProfile.ts" />
/// <reference path="filters/BoolString.ts" />
/// <reference path="services/DataService.ts" />
/// <reference path="services/CopyProfileService.ts" />
/// <reference path="directives/BreederDetails.ts" />
/// <reference path="directives/breederDetailsEdit.ts" />


/// <reference path="controllers/EditCtrl.ts" />
//#ref

var profile = angular.module("profile", ['ui.router']);


profile.config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});


profile.service("CopyProfileService", CopyProfileService);
profile.filter('boolString', () => {
    return (value:boolean):string => {
        return BoolString.filter(value);
    }
});



//#dir
profile.directive("breederDetails", breederDetails);
profile.directive("breederDetailsEdit", breederDetailsEdit);

profile.controller("EditCtrl", EditCtrl);
//#ctrl

profile.config(function ($httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

profile.value("toastr", toastr)
profile.service("DataService", DataService);

profile.config(
    ["$stateProvider", "$urlRouterProvider",
        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise("/profile");

            $stateProvider
                .state("profile", {
                    url: "/profile",
                    templateUrl: "../views/profile.html"
                })
                .state("edit", {
                    url: "/profile/edit",
                    controller: "EditCtrl",
                    templateUrl: "../views/profile-edit.html"
                })

//#state
        }]);

