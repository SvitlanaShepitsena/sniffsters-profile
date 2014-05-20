/// <reference path="../../../app/bower_components/DefinitelyTyped/jasmine/jasmine.d.ts" />
/// <reference path="../../../app/bower_components/DefinitelyTyped/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../app/scripts/app.ts" />


describe('test', () => {
    it('Does something', function () {
        var $injector = angular.injector([ 'profile' ]);
        var #name#Service = $injector.get('#name#Service ');
        expect(#name#Service.Method()).toBe(1);
    })
});

