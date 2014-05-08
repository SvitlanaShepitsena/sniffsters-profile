/// <reference path="../../bower_components/dt-angular/angular.d.ts" />
/// <reference path="../../bower_components/dt-angular/angular-resource.d.ts" />
var DataService = (function () {
    function DataService($http, $q) {
        this.$http = $http;
        this.$q = $q;
    }
    DataService.prototype.getProfile = function () {
        var d = this.$q.defer();

        this.$http.jsonp('http://localhost:44300/BreederPersonal/GetProfile?callback=JSON_CALLBACK', { headers: {
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            } }).success(function (result) {
            d.resolve(result);
        }).error(function (data, error) {
            // console.log(data)
            // console.log(error)
            d.reject();
        });
        return d.promise;
    };
    DataService.prototype.updateProfile = function () {
        var d = this.$q.defer();

        this.$http.jsonp('http://localhost:44300/BreederPersonal/GetProfile?callback=JSON_CALLBACK', { headers: {
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            } }).success(function (result) {
            d.resolve(result);
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
