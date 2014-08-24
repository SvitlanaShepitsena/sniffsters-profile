/// <reference path="../../bower_components/DefinitelyTyped/underscore/underscore.d.ts" />
/// <reference path="../models/IBreederProfile.ts" />
/// <reference path="IUserGenerator.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase.d.ts" />
var BreederGenerator = (function () {
    function BreederGenerator() {
    }
    BreederGenerator.prototype.create = function (email, mainRef, $firebase, nickName) {
        var user = new BreederProfile();
        var profileUrl = mainRef + "breeders" + '/' + nickName + '/' + 'profile';

        var userProfileRef = $firebase(new Firebase(profileUrl));

        user.Email = this.FireUnProcess(email);
        user.UserName = nickName;

        userProfileRef.$set(user);
        userProfileRef.$save();

        return user;
    };

    BreederGenerator.prototype.FireProcess = function (userName) {
        if (_.isUndefined(userName))
            return;
        return userName.replace(/\./g, '(p)');
    };

    BreederGenerator.prototype.FireUnProcess = function (userName) {
        if (_.isUndefined(userName))
            return;
        return userName.replace(/\(p\)/g, '.');
    };
    return BreederGenerator;
})();
