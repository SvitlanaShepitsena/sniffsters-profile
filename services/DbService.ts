/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/*import all types of angular and angular-resource module */
/*angular-resource.d.ts contains all interfaces of that module*/
class DbService {
    static $injector = ['$resource'];

    private resource: ng.resource.IResourceService;

    constructor($resource: ng.resource.IResourceService) {
        this.resource = $resource;
    }

    public getProfileData<TBreeder>(url: string) {
        var result = this.resource<TBreeder>(url);

        return result;
    }
}