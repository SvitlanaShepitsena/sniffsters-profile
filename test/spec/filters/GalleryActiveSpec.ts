/// <reference path="../../../app/bower_components/DefinitelyTyped/jasmine/jasmine.d.ts" />
/// <reference path="../../../app/bower_components/DefinitelyTyped/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../app/scripts/app.ts" />


describe('filter do test', () => {

    beforeEach(module('profile'));
    it('should convert boolean values to yes or no',
        inject((GalleryActiveFilter) => {
            expect(GalleryActiveFilter(true)).toBe('Yes');
            expect(GalleryActiveFilter(false)).toBe('No');
        }));
})