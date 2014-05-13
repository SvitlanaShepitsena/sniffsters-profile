/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../model/interfaces.d.ts" />
/// <reference path="../services/dbservice.ts" />
/// <reference path="../../../typings/toastr/toastr.d.ts" />
class ProfileCtrl {
    static $injector = ['$scope', 'dbService', 'toastr'];
    breeder: IUser;
    constructor(public $scope: IScope, public dbService: DbService, public toastr: Toastr) {
        $scope.vm = this;
        var result = this.dbService.getProfileData<Breeder>('/BreederPersonal/GetProfile');

        this.breeder = result.get(() => {
            this.breeder = this.breeder;
            this.error = false;
        },
            () => {
                this.showError('Error in DB request');
                this.error = true;
            });
    }

    showError(error: string): void {
        this.toastr.error(error);
    }
    error: boolean = false;
}