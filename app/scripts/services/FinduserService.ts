/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/underscore/underscore.d.ts" />
class FinduserService {
    constructor(public $firebase, public settings, public $filter, public $q:ng.IQService) {
    }

    find(userName:string) {
        userName = this.FireProcess(userName);


        var mainRef = this.$firebase(new Firebase(this.settings.MainUrl));

        var breeders = mainRef.$child('breeders');
        breeders.$on('value', (snapshot:any)=> {
            var bs = snapshot.snapshot.value;

            var userNames = _.pluck(_.pluck(this.$filter('orderByPriority')(bs), 'profile'), 'UserName');
            console.log(userNames);
        });

    }

    FireProcess(userName:string) {
        return userName.replace(/\./g, '(p)');
    }

    FireUnProcess(userName:string) {
        return userName.replace(/\(p\)/g, '.');

    }
}
