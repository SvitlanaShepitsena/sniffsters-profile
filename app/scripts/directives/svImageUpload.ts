/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface ISvImageUpload extends ng.IScope {
    test:string;
}

var svImageUpload:($firebase) => ng.IDirective = () => {

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
        link: (scope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
            scope.fileFirebase;

            element.bind('change', (e:any)=> {
                var file = e.target.files[0];
                reader = new FileReader();

                reader.onload = (loadEvent)=> {
                    scope.fileFired = loadEvent.target.result;

                    var child = scope.mainRef.$child("images");
                    child.$add({
                        name: file.name,
                        file: scope.fileFired
                    })
                    child.$save();
//                    console.log(scope.fileFired);
                }
                reader.readAsDataURL(file);
                console.log(file);
            })
            var reader = new FileReader();


        }
    }
}
