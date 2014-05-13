/// <reference path="../../bower_components/dt-angular/angular.d.ts" />
/// <reference path="../../bower_components/dt-angular/angular-resource.d.ts" />

class DataService{
    constructor(public $http:ng.IHttpService, public $q:ng.IQService){
    }

    getProfile<T>(){
        var d = this.$q.defer<T>();

        this.$http.jsonp('http://localhost:44300/BreederPersonal/GetProfile?callback=JSON_CALLBACK',{
            headers:{
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            }}).success((result) => {

            d.resolve(result);
        }).error((data,error) => {
            // console.log(data)
            // console.log(error)
            d.reject();
        });
        return d.promise;
    }
   updateProfile<T>(t:T){
        var d = this.$q.defer<T>();

        this.$http.jsonp('http://localhost:44300/BreederPersonal/UpdateUserProfile?callback=JSON_CALLBACK')
            .success(() => {
            d.resolve();
        }).error((data,error) => {
            // console.log(data)
            // console.log(error)
            d.reject();
        });
        return d.promise;
    }
}
