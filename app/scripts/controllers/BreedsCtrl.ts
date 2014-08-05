/// <reference path="HomeCtrl.ts" />
/// <reference path="../app.ts" />

class BreedsCtrl {

    constructor(public $scope, $modal, public $stateParams, public $state:ng.ui.IStateService, public toastr:Toastr, public $firebase) {
        $scope.breeds = this;
        $scope.newBreed = {}

        $scope.saveBreed = (breed:string) => {
            $scope.breeds.$add(breed);
        }

        $scope.saveLocation = (location:string) => {

            $scope.locations.$add(location);
        }


        $scope.remove = (key:string)=> {
            $scope.breeds.$remove(key);
        }
        $scope.breeds = $firebase(new Firebase($scope.home.MainUrl + 'breeds'));
        $scope.locations = $firebase(new Firebase($scope.home.MainUrl + 'locations'));

    }

    ShowSuccess(note:string) {
        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }
}