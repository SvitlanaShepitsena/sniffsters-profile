/// <reference path="../../../app/bower_components/dt-jasmine/jasmine.d.ts" />
/// <reference path="../../../app/bower_components/dt-angular/angular-mocks.d.ts" />
/// <reference path="../../../app/bower_components/dt-angular/angular.d.ts" />
/// <reference path="../../../app/scripts/app.ts" />

describe("Example Controller Test", () => {
    // Setting a variables needed to perform test
    var $q,
        toastr = {
            error(error) {},
            info(info) {}
        },
        DataService,
        scope,
        $controller,
        ctrlexample;

    beforeEach(() => {

        angular.mock.inject(($injector) => {
            $q = $injector.get('$q');
            var $rootScope = $injector.get('$rootScope');
            $controller = $injector.get('$controller');
            scope = $rootScope.$new();
        });
    });

//Positive
    it('Should <DO SOMETH.>', () => {
        DataService = {
            getProfile: () => {
                // Create a postponed service which can be returned in promise
                var d = $q.defer();
                // emulating resolution
                d.resolve({ FirstName: 'Andriy', LastName: 'Shepitsen', UserName: 'andriy.shepitsen@aol.com' });
                return d.promise;
            }
        };

        ctrlexample = $controller('ExampleCtrl', {
            $scope: scope,
            DataService: DataService,
            toastr: toastr
        });
        scope.$apply();


         expect(1).toBe(1);
        //expect(ctrlexample.).toBeDefined();
        //expect(ctrlexample.).toBe();
    });

    it('Should    when error  ', () => {
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


        ctrlexample = $controller('ExampleCtrl', {
            $scope: scope,
            DataService: DataService,
            toastr: toastr

        });
     
        spyOn(ctrlexample, 'ShowError');
        scope.$apply();

        expect(2).toBe(2);
       // expect(ctrlexample.error).toBeDefined();
       // expect(ctrlexample.ShowError).toHaveBeenCalled();
    });
});

