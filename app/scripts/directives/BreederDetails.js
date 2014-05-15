/// <reference path="../app.ts" />
/// <reference path="../services/DataService.ts" />

//
var breederDetails = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/breeder-details.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',
            text: '@',
            func: '&'
        },
        //        Directive can have controllers and have the same capabilities to do any data management
        //        controller: ($scope, DataService:DataService) => {
        //            var bc = DataService.getProfile<IBreederProfile>();
        //        },
        link: function (scope, element, attrs) {
            //            SCOPE (USE just {{test}} . )
            scope.test = 'Test from link scope';
        }
    };
};
//# sourceMappingURL=BreederDetails.js.map
