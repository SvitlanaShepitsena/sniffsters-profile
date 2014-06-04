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
            d.reject();
        });
        return d.promise;
    };

    DataService.prototype.updateProfile = function (t) {
        var d = this.$q.defer();

        this.$http.post('http://localhost:44300/BreederPersonal/UpdateUserProfile', { BreederViewModel: t }).success(function () {
            d.resolve();
        }).error(function (data, error) {
            d.reject();
        });
        return d.promise;
    };

    DataService.prototype.getGalleries = function () {
        var d = this.$q.defer();

        this.$http.get('http://localhost:44300/BreederPersonal/GetGalleries').success(function (result) {
            d.resolve(result);
        }).error(function (data, error) {
            d.reject();
        });
        return d.promise;
    };
    DataService.prototype.updateGalleries = function (t) {
        var d = this.$q.defer();

        this.$http.post('http://localhost:44300/BreederPersonal/UpdateGalleries', { Galleries: t }).success(function () {
            d.resolve();
        }).error(function (data, error) {
            d.reject();
        });
        return d.promise;
    };
    return DataService;
})();
