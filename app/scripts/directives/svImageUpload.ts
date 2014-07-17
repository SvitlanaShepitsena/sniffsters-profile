/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angularfire/angularfire.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/underscore/underscore.d.ts" />

interface ISvImageUpload extends ng.IScope {
    test:string;
}

var svImageUpload = ($firebase) => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/sv-image-upload.html',
        // replace directive tag with template info
        replace: true,
        scope: {
            mainRef: '=',

            url: '@',
            func: '&'
        },
        link: (scope, element, attrs:ng.IAttributes) => {
            scope.fileFirebase;

//            console.log(scope.mainRef);
            this.MainUrl = "https://torid-fire-6526.firebaseio.com/images";
//            this.MainRef = new Firebase(this.MainUrl);
//            var f = new Firebase(this.MainUrl);
//            f.once('value', function(snap) {
//                var payload = snap.val();
//                scope.cover = _.values(payload);
//
//                console.log(scope.cover);
//                if (payload != null) {
////                    angular.element("#pano").src = payload;
//                } else {
//                    $('#body').append("Not found");
//                }
//            });
            element.bind('change', (e:any)=> {
                var file = e.target.files[0];
                reader = new FileReader();

                reader.onload = (loadEvent)=> {
                    scope.fileFired = loadEvent.target.result;
                    var child = scope.mainRef.$remove("images");

                    var child = scope.mainRef.$child("images");
                    child.$add(scope.fileFired);
                    child.$save().then(() => {
                        var f = new Firebase(this.MainUrl);
                        f.once('value', function (snap) {
                            var payload = snap.val();
                            scope.cover = _.values(payload)[0];
                            if (payload != null) {
//                                angular.element("#pano").src = payload;
                            } else {
                                $('#body').append("Not found");
                            }
                        });
                    });
//                    console.log(scope.fileFired);
                }
                reader.readAsDataURL(file);
            })
            var reader = new FileReader();


        }
    }
}
