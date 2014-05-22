/// <reference path="../bower_components/dt-angular/angular.d.ts" />
/// <reference path="../../dist/bower_components/dt-toastr/toastr.d.ts" />
/// <reference path="models/IBreederProfile.ts" />
/// <reference path="filters/BoolString.ts" />
/// <reference path="services/DataService.ts" />
/// <reference path="services/CopyProfileService.ts" />
/// <reference path="directives/BreederDetails.ts" />
/// <reference path="directives/breederDetailsEdit.ts" />
/// <reference path="controllers/EditCtrl.ts" />
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

profile.directive("breederDetails", breederDetails);
profile.directive("breederDetailsEdit", breederDetailsEdit);

profile.controller("EditCtrl", EditCtrl);

//#ctrl
profile.config(function ($httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

profile.value("toastr", toastr);
profile.service("DataService", DataService);

profile.config([
    "$stateProvider", "$urlRouterProvider",
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/profile");

        $stateProvider.state("profile", {
            url: "/profile",
            templateUrl: "../views/profile.html"
        }).state("edit", {
            url: "/profile/edit",
            controller: "EditCtrl",
            templateUrl: "../views/profile-edit.html"
        });
        //#state
    }]);
//# sourceMappingURL=app.js.map
;/// <reference path="../../bower_components/dt-angular/angular.d.ts" />
/// <reference path="IndexCtrl.ts" />
/// <reference path="../../../dist/bower_components/dt-toastr/toastr.d.ts" />
/// <reference path="../models/IBreederProfile.ts" />
/// <reference path="../services/CopyProfileService.ts" />
/// <reference path="../app.ts" />
var EditCtrl = (function () {
    function EditCtrl($scope, toastr, DataService, CopyProfileService) {
        this.toastr = toastr;
        this.DataService = DataService;
        this.CopyProfileService = CopyProfileService;
        this.BreederProfileEdit = new BreederProfile();
        $scope.edit = this;

        this.BreederProfileEdit = this.CopyProfileService.GetProfile();
        //        console.log(CopyProfileService);
    }
    EditCtrl.prototype.Save = function () {
        var _this = this;
        //Run Service UpdateProfile Method and get promise back
        var promise = this.DataService.updateProfile(this.BreederProfileEdit);

        //resolving promise
        promise.then(function () {
            // Success
            _this.ShowSuccess('Successfully Saved');
        }, function () {
            // Error
            _this.ShowError('Db Connection Problem');
        });
    };

    EditCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    EditCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return EditCtrl;
})();
//# sourceMappingURL=EditCtrl.js.map
;/// <reference path="../../bower_components/dt-angular/angular.d.ts" />
/// <reference path="../app.ts" />
/// <reference path="../services/CopyProfileService.ts" />
/// <reference path="../models/IBreederProfile.ts" />
var IndexCtrl = (function () {
    function IndexCtrl($scope, toastr, DataService, CopyProfileService) {
        var _this = this;
        this.toastr = toastr;
        this.DataService = DataService;
        this.CopyProfileService = CopyProfileService;
        this.text = 'Text Outer Scope';
        $scope.index = this;

        var promiseT = this.DataService.getProfile();

        promiseT.then(function (breederProfile) {
            //Success
            _this.error = false;
            _this.BreederProfile = breederProfile;
            _this.CopyProfileService.Clone(breederProfile);
        }, function () {
            //Error
            _this.error = true;
            _this.ShowError("Error in Db Connection");
        });
    }
    IndexCtrl.prototype.ShowError = function (errorMessage) {
        this.toastr.error(errorMessage);
    };
    return IndexCtrl;
})();
//# sourceMappingURL=IndexCtrl.js.map
;/// <reference path="../../bower_components/dt-angular/angular.d.ts" />

var breederDetails = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/breeder-details.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',
            text: '@',
            func: '&'
        },
        link: function (scope, element, attrs) {
            //            SCOPE (USE just {{test}} . )
            scope.test = 'Test from link scope';

            // Element
            element.on('mouseover', function (e) {
                element.css({ opacity: 0.75 });
            });
            element.on('mouseout', function (e) {
                element.css({ opacity: 1 });
            });
        }
    };
};
//# sourceMappingURL=BreederDetails.js.map
;/// <reference path="../../bower_components/dt-angular/angular.d.ts" />

var breederDetailsEdit = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/breeder-details-edit.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',
            text: '@',
            func: '&'
        },
        link: function (scope, element, attrs) {
            //            SCOPE (USE just {{test}} . )
            scope.test = 'Test from link scope';

            // Element
            element.on('mouseover', function (e) {
                element.css({ opacity: 0.75 });
            });
            element.on('mouseout', function (e) {
                element.css({ opacity: 1 });
            });
        }
    };
};
//# sourceMappingURL=breederDetailsEdit.js.map
;var BoolString = (function () {
    function BoolString() {
    }
    BoolString.filter = function (value) {
        return value === true ? "Yes" : "No";
    };
    return BoolString;
})();
//# sourceMappingURL=BoolString.js.map
;var BreederProfile = (function () {
    function BreederProfile() {
    }
    return BreederProfile;
})();
//# sourceMappingURL=IBreederProfile.js.map
;/// <reference path="../models/IBreederProfile.ts" />
var CopyProfileService = (function () {
    function CopyProfileService() {
        this.BreederProfile = new BreederProfile();
    }
    CopyProfileService.prototype.Clone = function (breederProfile) {
        for (var key in breederProfile) {
            if (breederProfile.hasOwnProperty(key)) {
                this.BreederProfile[key] = breederProfile[key];
            }
        }
    };

    CopyProfileService.prototype.GetProfile = function () {
        console.log('here');
        return this.BreederProfile;
    };
    return CopyProfileService;
})();
//# sourceMappingURL=CopyProfileService.js.map
;/// <reference path="../../bower_components/dt-angular/angular.d.ts" />
var DataService = (function () {
    function DataService($http, $q) {
        this.$http = $http;
        this.$q = $q;
    }
    DataService.prototype.getProfile = function () {
        var d = this.$q.defer();

        this.$http.get('http://localhost:44300/BreederPersonal/GetProfile').success(function (result) {
            d.resolve(result);
        }).error(function (data, error) {
            // console.log(data)
            // console.log(error)
            d.reject();
        });
        return d.promise;
    };
    DataService.prototype.updateProfile = function (t) {
        var d = this.$q.defer();

        this.$http.post('http://localhost:44300/BreederPersonal/UpdateUserProfile', { BreederViewModel: t }).success(function () {
            d.resolve();
        }).error(function (data, error) {
            // console.log(data)
            // console.log(error)
            d.reject();
        });
        return d.promise;
    };
    return DataService;
})();
//# sourceMappingURL=DataService.js.map
