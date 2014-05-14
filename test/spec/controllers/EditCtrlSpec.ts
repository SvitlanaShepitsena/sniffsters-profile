/// <reference path="../../../app/bower_components/dt-jasmine/jasmine.d.ts" />
/// <reference path="../../../app/bower_components/dt-angular/angular-mocks.d.ts" />
/// <reference path="../../../app/bower_components/dt-angular/angular.d.ts" />
/// <reference path="../../../app/scripts/app.ts" />

describe("Edit Controller Test", () => {
    // Setting a variables needed to perform test
    var $q,$location,
        $state = {
            go(page){}
        },
        toastr = {
            error(error) {
            },
            info(info) {
            }
        },
        DataService,
        scope,
        $controller,
        ctrlEdit;

// Emulating CopyProfileService
    var CopyProfileService = {
        Clone: (breederProfile)  => {

        },
        GetProfile: () => {
            return {};
        }
    }

    beforeEach(() => {
        angular.mock.inject(($injector) => {
            $q = $injector.get('$q');
            var $rootScope = $injector.get('$rootScope');
            $location = $injector.get('$location');
            $controller = $injector.get('$controller');
            scope = $rootScope.$new();
        });
    });

//Positive
    it('Should save changes in breeder Profile and notify user and redirect to /profile', () => {
        DataService = {
            updateProfile: (breederProfile) => {
                // Create a postponed service which can be returned in promise
                var d = $q.defer();
                // emulating resolution
                d.resolve();
                return d.promise;
            }
        };

        ctrlEdit = $controller('EditCtrl', {
            $scope: scope,
            $state:$state,
            $location:$location,
            toastr: toastr,
            DataService: DataService,
            CopyProfileService: CopyProfileService
        });

        spyOn(ctrlEdit, 'ShowSuccess');
        ctrlEdit.Save();
        scope.$apply();

//        expect($location.path).toBe('#/profile');

        expect(ctrlEdit.ShowSuccess).toHaveBeenCalled();
        //expect(ctrledit.).toBeDefined();
        //expect(ctrledit.).toBe();
    });

    it('Should notify user about problem with Db Update when error  ', () => {
        // Emulating Db request
        DataService = {
            updateProfile: (breederProfile) => {
                // Create a postponed service which can be returned in promise
                var d = $q.defer();
                // emulating resolution
                d.reject();
                return d.promise;
            }
        };

         ctrlEdit = $controller('EditCtrl', {
            $scope: scope,
            $state: $state,
            toastr: toastr,
            DataService: DataService,
            CopyProfileService: CopyProfileService
        });


        spyOn(ctrlEdit, 'ShowError');
        ctrlEdit.Save();
        scope.$apply();

        expect(ctrlEdit.ShowError).toHaveBeenCalled();
//        expect(ctrlEdit.ShowSuccess).toHaveBeenCalled();
       // expect(ctrledit.error).toBeDefined();
       // expect(ctrledit.ShowError).toHaveBeenCalled();
    });
});

