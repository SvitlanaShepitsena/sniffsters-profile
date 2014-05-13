/// <reference path="../../../app/bower_components/dt-jasmine/jasmine.d.ts" />
/// <reference path="../../../app/bower_components/dt-angular/angular-mocks.d.ts" />
/// <reference path="../../../app/bower_components/dt-angular/angular.d.ts" />
/// <reference path="../../../app/scripts/app.ts" />

describe("Profile Controller Test", () => {
    // Setting a variables needed to perform test
    var $q,
        toastr = {
            error(error) {
            }
        },
        DataService,
        scope,
        $controller,
        ctrl;
    var CopyProfileService = {
        Clone:(breederProfile)  => {

        },
        getProfile:() => {
            return {};
        }
    }

    beforeEach(() => {

        angular.mock.inject(($injector) => {
            $q = $injector.get('$q');
// rootscope generates mocking scope
            var $rootScope = $injector.get('$rootScope');
// creator of controller
            $controller = $injector.get('$controller');
// create a scope with $rootscope
            scope = $rootScope.$new();
        });
    });

    it('Should register property UserProfile and fill it with Db response (FirstName, LastName, UserName)', () => {
        // Emulating Db request
        DataService = {
            getProfile: () => {
                // Create a postponed service which can be returned in promise
                var d = $q.defer();
                // emulating resolution
                d.resolve({ FirstName: 'Andriy', LastName: 'Shepitsen', UserName: 'andriy.shepitsen@aol.com' });
                return d.promise;
            }
        };

// Creating IndexCtrl for test using our defined Controller
        ctrl = $controller('IndexCtrl', {
            $scope: scope,
            toastr: toastr,
            DataService: DataService,
            CopyProfileService: CopyProfileService

        });
        /// RESOLVE ALL PROMISES!!!!
        scope.$apply();


        expect(scope.index.BreederProfile).toBeDefined();

        expect(scope.index.BreederProfile.FirstName).toBe('Andriy');
        expect(ctrl.BreederProfile.LastName).toBe('Shepitsen');
        expect(ctrl.BreederProfile.UserName).toBe('andriy.shepitsen@aol.com');
    });

    it('Should set error to true when return an error and run method ShowError', () => {
        // Emulating Db request
        DataService = {
            getProfile: () => {
                // Create a postponed service which can be returned in promise
                var d = $q.defer();
                // emulating resolution
                d.reject();
                return d.promise;
            }
        };

// Creating Profile Ctrl for test using our defined Controller

        ctrl = $controller('IndexCtrl', {
            $scope: scope,
            toastr: toastr,
            DataService: DataService,
            CopyProfileService: CopyProfileService

        });
        /// RESOLVE ALL PROMISES!!!!
        // Set a SPY BEFORE RESOLUTION of promises
        spyOn(ctrl, 'ShowError');
        scope.$apply();

        expect(ctrl.BreederProfile).toBeUndefined();

        expect(ctrl.error).toBeDefined();

        expect(ctrl.ShowError).toHaveBeenCalled();
    });
});

