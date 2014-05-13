/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/*import all types of angular and angular-resource module */
/*angular-resource.d.ts contains all interfaces of that module*/
var DbService = (function () {
    function DbService($resource) {
        this.resource = $resource;
    }
    DbService.prototype.getProfileData = function (url) {
        var result = this.resource(url);

        return result;
    };
    DbService.$injector = ['$resource'];
    return DbService;
})();
//# sourceMappingURL=dbservice.js.map
