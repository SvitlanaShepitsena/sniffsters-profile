/// <reference path="models/IBreederProfile.ts" />
/// <reference path="filters/BoolString.ts" />
/// <reference path="services/DataService.ts" />
/// <reference path="services/CopyProfileService.ts" />
/// <reference path="directives/BreederDetails.ts" />
/// <reference path="directives/breederDetailsEdit.ts" />
/// <reference path="controllers/EditCtrl.ts" />
/// <reference path="controllers/AboutCtrl.ts" />
/// <reference path="controllers/PhotosCtrl.ts" />
//#ref
var profile = angular.module("profile", ['ui.router']);

profile.config(function ($httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

profile.service("CopyProfileService", CopyProfileService);
profile.filter('boolString', function () {
    return function (value) {
        return BoolString.filter(value);
    };
});

profile.service("DataService", DataService);

//#dir
profile.directive("breederDetails", breederDetails);
profile.directive("breederDetailsEdit", breederDetailsEdit);

profile.controller("EditCtrl", EditCtrl);
profile.controller("AboutCtrl", AboutCtrl);
profile.controller("PhotosCtrl", PhotosCtrl);

//#ctrl
profile.config(function ($httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

profile.value("toastr", toastr);

profile.config([
    "$stateProvider", "$urlRouterProvider",
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/profile");

        $stateProvider.state('profile', {
            url: "/profile",
            views: {
                "main": {
                    template: "Main"
                },
                "details": {
                    template: "Sub2<div ui-view></div>"
                }
            }
        }).state('profile.edit', {
            url: "/profile/edit",
            views: {
                "details": {
                    template: "Sub2<div ui-view></div>"
                }
            }
        });
        //                .state('edit', {
        //                    url: "/profile/edit",
        //                    views: {
        //                        "main": {
        //                            template: "index.viewA"
        //                        },
        //                        "details": {
        //                            template: "<breeder-details-edit ctrl = 'edit'></breeder-details-edit>",
        //                            controller:"EditCtrl"
        //                        }
        //                    }
        //                })
        //#state
    }]);
//# sourceMappingURL=app.js.map
