/// <reference path="HomeCtrl.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angularfire/angularfire.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase.d.ts" />

interface IMessagesScope extends IHomeScope {
    messages:MessagesCtrl;
    home:HomeCtrl;


}
class MessagesCtrl {

    fireMessages;

    corrUsers:string[];
    selectedUserMessages:INote[];
    selectedUser:string;

    constructor(public $scope:IMessagesScope, $modal, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.messages = this;

        DataService.getMessages($scope.home.IdFire).then((messages:any)=> {
            this.fireMessages = messages;

            var inbox = messages.Inbox;
            this.corrUsers = _.map(_.keys(inbox), (userFire) => {
                return userFire.toString().replace(/\(p\)/g, '.');
            });
            this.selectedUser = this.corrUsers[0];

        })
    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}