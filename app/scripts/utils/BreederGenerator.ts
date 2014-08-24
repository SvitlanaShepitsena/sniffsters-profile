/// <reference path="../../bower_components/DefinitelyTyped/underscore/underscore.d.ts" />
/// <reference path="../models/IBreederProfile.ts" />
/// <reference path="IUserGenerator.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase.d.ts" />

class BreederGenerator implements IUserGenerator {
    create(email:string, mainRef:string, $firebase:any, nickName:string) {

        var user = new BreederProfile();
        var profileUrl = mainRef + "breeders" + '/' + nickName + '/' + 'profile';

        var userProfileRef = $firebase(new Firebase(profileUrl));



        user.Email = this.FireUnProcess(email);
        user.UserName = nickName;

        userProfileRef.$set(user);
        userProfileRef.$save();

        return user;
    }

    FireProcess(userName:string) {
        if (_.isUndefined(userName)) return;
        return userName.replace(/\./g, '(p)');

    }

    FireUnProcess(userName:string) {
        if (_.isUndefined(userName)) return;
        return userName.replace(/\(p\)/g, '.');

    }
}
