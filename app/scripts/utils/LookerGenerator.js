/// <reference path="../../bower_components/DefinitelyTyped/underscore/underscore.d.ts" />
/// <reference path="../models/IBreederProfile.ts" />
/// <reference path="../models/ILookerProfile.ts" />
/// <reference path="IUserGenerator.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase.d.ts" />
var LookerGenerator = (function () {
    function LookerGenerator() {
    }
    LookerGenerator.prototype.create = function (email, mainRef, $firebase, nickName) {
        var user = new LookerProfile();
        var userUrl = mainRef + "lookers";
        console.log(userUrl);

        var usersRef = $firebase(new Firebase(userUrl));

        var userRef = usersRef.$child(email);
        var profileRef = userRef.$child('profile');

        user.Email = this.FireUnProcess(email);
        user.UserName = nickName;

        //        console.log(user);
        profileRef.$set(user);

        usersRef.$save(email);

        return user;
    };

    LookerGenerator.prototype.FireProcess = function (userName) {
        if (_.isUndefined(userName))
            return;
        return userName.replace(/\./g, '(p)');
    };

    LookerGenerator.prototype.FireUnProcess = function (userName) {
        if (_.isUndefined(userName))
            return;
        return userName.replace(/\(p\)/g, '.');
    };
    return LookerGenerator;
})();
