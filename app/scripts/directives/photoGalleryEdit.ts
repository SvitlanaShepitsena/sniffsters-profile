/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />


var photoGalleryEdit:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/photo-gallery-edit.html',
        // replace directive tag with template info
        replace: true,
        controller: ($scope, $state, $modal) => {
            $scope.files = [];

            $scope.saveGallery = () => {
                var photos = $scope.gallery.$child('Photos');

                $scope.files.forEach((photo, index)=> {
                    photos.$add(photo);
                })

                $scope.gallery.$save().then(() => {
                    $state.go('^');
                })
            }
            $scope.saveTitle = () => {
                $scope.gallery.$save('Title').then(() => {
//                    $state.go('^');
                })
            }

            $scope.remove = (key) => {
                $scope.gallery.$child('Photos').$child(key).$remove();
            }
        }
    }
}
