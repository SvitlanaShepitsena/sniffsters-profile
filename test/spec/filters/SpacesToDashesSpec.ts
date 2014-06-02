/// <reference path="../../../app/bower_components/DefinitelyTyped/jasmine/jasmine.d.ts" />
/// <reference path="../../../app/bower_components/DefinitelyTyped/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../app/scripts/app.ts" />


describe('filter do test', () =>  {

  beforeEach(module('profile'));
    it('should convert boolean values to yes or no',
        inject((SpacesToDashesFilter) =>  {
      expect(SpacesToDashesFilter(true)).toBe('Yes');
      expect(SpacesToDashesFilter(false)).toBe('No');
    }));
})