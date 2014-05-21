/// <reference path="../../../app/bower_components/DefinitelyTyped/jasmine/jasmine.d.ts" />
/// <reference path="../../../app/bower_components/DefinitelyTyped/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../app/scripts/app.ts" />


describe('filter do test', () =>  {

  beforeEach(module('profile'));
    it('should convert boolean values to yes or no',
        inject((#name#Filter) =>  {
      expect(#name#Filter(true)).toBe('Yes');
      expect(#name#Filter(false)).toBe('No');
    }));
})