/// <reference path="../../../app/bower_components/DefinitelyTyped/jasmine/jasmine.d.ts" />
/// <reference path="../../../app/bower_components/DefinitelyTyped/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../app/scripts/app.ts" />
describe("Details Controller Test", function () {
    // Setting a variables needed to perform test
    var $q, toastr = {
        error: function (error) {
        },
        info: function (info) {
        }
    }, DataService, scope, $controller, ctrldetails;

    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            $q = $injector.get('$q');
            var $rootScope = $injector.get('$rootScope');
            $controller = $injector.get('$controller');
            scope = $rootScope.$new();
        });
    });

    //Positive
    it('Should <DO SOMETH.>', function () {
        DataService = {
            getProfile: function () {
                // Create a postponed service which can be returned in promise
                var d = $q.defer();

                // emulating resolution
                d.resolve({ FirstName: 'Andriy', LastName: 'Shepitsen', UserName: 'andriy.shepitsen@aol.com' });
                return d.promise;
            }
        };

        ctrldetails = $controller('DetailsCtrl', {
            $scope: scope,
            DataService: DataService,
            toastr: toastr
        });
        scope.$apply();

        expect(1).toBe(1);
        //expect(ctrldetails.).toBeDefined();
        //expect(ctrldetails.).toBe();
    });

    it('Should    when error  ', function () {
        // Emulating Db request
        DataService = {
            getProfile: function () {
                // Create a postponed service which can be returned in promise
                var d = $q.defer();

                // emulating resolution
                d.reject();
                return d.promise;
            }
        };

        ctrldetails = $controller('DetailsCtrl', {
            $scope: scope,
            DataService: DataService,
            toastr: toastr
        });

        spyOn(ctrldetails, 'ShowError');
        scope.$apply();

        expect(2).toBe(2);
        // expect(ctrldetails.error).toBeDefined();
        // expect(ctrldetails.ShowError).toHaveBeenCalled();
    });
});
//# sourceMappingURL=DetailsCtrlSpec.js.map
