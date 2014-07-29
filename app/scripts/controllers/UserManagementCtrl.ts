/// <reference path="HomeCtrl.ts" />

interface IUserManagementScope extends IHomeScope {
    management:UserManagementCtrl;
    home:HomeCtrl;
}
class UserManagementCtrl {
    breeders:any;
    lookers:any;
    urlRef:string;

    constructor(public $scope, $timeout, public $firebase, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {

        this.urlRef = $scope.home.MainUrl + 'breeders';
        this.breeders = $firebase(new Firebase(this.urlRef));

        this.urlRef = $scope.home.MainUrl + 'lookers';
        this.lookers = $firebase(new Firebase(this.urlRef));

        $scope.management = this;

        $scope.showMessages = [];

        $scope.modal = {
            "title": "Title",
            "content": "Hello Modal<br />This is a multiline message!",
            show: true
        };

        $scope.showMessageForm = (id) => {
            $timeout(()=> {
                $scope.showMessages.push(id);
            })
        }
    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}