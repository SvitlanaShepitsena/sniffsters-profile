/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../controllers/IndexCtrl.d.ts" />
interface IDetailsInfoEdit extends ng.IScope {
    test: string;
    ResetAllFields: () => void;
    SaveKennelName: () => void;
    ctrl: IndexCtrl;
    form: HTMLFormElement;
}
declare var detailsInfoEdit:() => ng.IDirective;
