/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../controllers/profilectrl.ts" />

interface IScope extends ng.IScope {
    vm: ProfileCtrl;

}
interface IUserProfile extends ng.IScope {
    display: boolean;
    edit:() => void;
    save:() => void;

}


interface IDirective extends ng.IDirective
    {
    }

interface IUser {
    FirstName: string;
    LastName: string;
    UserName: string;
}

