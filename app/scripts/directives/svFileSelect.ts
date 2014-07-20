/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/underscore/underscore.d.ts" />


var svFileSelect = ($timeout, $parse) => {

    return{

        link: (scope, element, attrs:ng.IAttributes) => {
            element.bind('change', (evt) => {
                var files = [], fileList, i;
                fileList = evt.target.files;
                if (fileList != null) {
                    for (i = 0; i < fileList.length; i++) {
                        files.push(fileList.item(i));
                    }
                }
                $timeout(() => {
                    scope.onFileSel(files);
                });
            });

        }
    }
}
