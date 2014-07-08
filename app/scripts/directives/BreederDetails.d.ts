/// <reference path="../app.d.ts" />
interface IDBreederDetails extends ng.IScope {
    IsEdit: Boolean;
    ctrl: IndexCtrl;
    Edit: () => void;
    Cancel: () => void;
    Save: () => void;
}
declare var breederDetails:() => ng.IDirective;
