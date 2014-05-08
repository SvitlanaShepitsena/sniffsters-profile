/// <reference path="../bower_components/dt-angular/angular.d.ts" />
/// <reference path="../bower_components/dt-ui-router/angular-ui-router.d.ts" />

/// <reference path="../bower_components/dt-toastr/toastr.d.ts" />
/// <reference path="models/IUserProfile.ts" />
/// <reference path="services/DataService.ts" />
/// <reference path="controllers/EditProfileCtrl.ts" />

/// <reference path="controllers/ExampleCtrl.ts" />
/// <reference path="controllers/ExampleCtrl.ts" />
/// <reference path="controllers/ExampleCtrl.ts" />
/// <reference path="controllers/ExampleCtrl.ts" />
/// <reference path="controllers/ExampleCtrl.ts" />
/// <reference path="controllers/ExampleCtrl.ts" />
/// <reference path="controllers/ExampleCtrl.ts" />
//#ref

var profile = angular.module("profile", ['ui.router']);


profile.controller("ExampleCtrl", ExampleCtrl);
profile.controller("ExampleCtrl", ExampleCtrl);
profile.controller("ExampleCtrl", ExampleCtrl);
profile.controller("ExampleCtrl", ExampleCtrl);
profile.controller("ExampleCtrl", ExampleCtrl);
profile.controller("ExampleCtrl", ExampleCtrl);
profile.controller("ExampleCtrl", ExampleCtrl);
//#ctrl


profile.config(function ($httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

profile.value("toastr", toastr)
profile.service("DataService", DataService);
profile.controller('EditProfileCtrl', EditProfileCtrl);

profile.config(
    ["$stateProvider", "$urlRouterProvider",
        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise("/profile");

            $stateProvider
                .state("profile", {
                    url: "/profile",
                    templateUrl: "../views/profile.html"
                })

				.state("example", {
					url: "/profile/example", 
					controller:"ExampleCtrl",
					templateUrl: "../views/profile-example.html"
				})


				.state("example", {
					url: "/profile/example", 
					controller:"ExampleCtrl",
					templateUrl: "../views/profile-example.html"
				})
//#state
        }]);

