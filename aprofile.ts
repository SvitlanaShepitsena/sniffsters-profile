/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/angularjs/angular-route.d.ts" />
/// <reference path="directives/userprofiledirective.ts" />

/// <reference path="directives/userprofiledirective.ts" />
/// <reference path="filters/boolstring.ts" />
/// <reference path="services/dbservice.ts" />

/// <reference path="controllers/profilectrl.ts" />
/// <reference path="model/interfaces.d.ts" />
var aprofile = angular.module('aprofile', ['ngRoute', 'ngResource']);

aprofile.value('toastr', toastr);
/*Services*/
aprofile.service('dbService', DbService);

/*Filters*/
aprofile.filter('boolString', () => {
        return (value: boolean): string => {
        return BoolString.filter(value);
    }
    });

/*Directives*/
aprofile.directive('userProfileDirective', userProfileDirective);
