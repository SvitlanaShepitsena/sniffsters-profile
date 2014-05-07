/// <reference path="../bower_components/dt-angular/angular.d.ts" />
/// <reference path="../bower_components/dt-ui-router/angular-ui-router.d.ts" />
/// <reference path="../bower_components/dt-toastr/toastr.d.ts" />
/// <reference path="models/IUserProfile.ts" />
/// <reference path="services/DataService.ts" />
/// <reference path="controllers/EditProfileCtrl.ts" />
var profile = angular.module("profile", ['ui.router']);

profile.config(function ($httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

profile.value("toastr", toastr);
profile.service("DataService", DataService);
profile.controller('EditProfileCtrl', EditProfileCtrl);

profile.config([
    "$stateProvider", "$urlRouterProvider",
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/profile");

        $stateProvider.state("profile", {
            url: "/profile",
            templateUrl: "../views/profile.html"
        }).state("edit", {
            url: "/profile/edit",
            controller: 'EditProfileCtrl',
            templateUrl: "../views/profile-edit.html"
        });
    }]);
//# sourceMappingURL=app.js.map
