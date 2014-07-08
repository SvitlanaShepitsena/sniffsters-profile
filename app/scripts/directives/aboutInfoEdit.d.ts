/// <reference path="../app.d.ts" />
interface IAboutInfoEdit extends ng.IScope {
    test: string;
    IsEdit: Boolean;
    Save: () => void;
    Cancel: () => void;
    ctrl: IndexCtrl;
    KennelNameValid: boolean;
    KennelNameValidityCheck: () => boolean;
    form: HTMLFormElement;
}
declare var aboutInfoEdit:() => ng.IDirective;
