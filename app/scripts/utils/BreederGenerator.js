/// <reference path="../../bower_components/DefinitelyTyped/underscore/underscore.d.ts" />
/// <reference path="../models/IBreederProfile.ts" />
/// <reference path="IUserGenerator.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase.d.ts" />
var BreederGenerator = (function () {
    function BreederGenerator() {
    }
    BreederGenerator.prototype.create = function (email, mainRef, $firebase, nickName) {
        var user = new BreederProfile();
        var userUrl = mainRef + "breeders";

        var usersRef = $firebase(new Firebase(userUrl));

        var userRef = usersRef.$child(email);
        var profileRef = userRef.$child('profile');

        user.Email = email;
        user.UserName = nickName;

        profileRef.$set(user);

        usersRef.$save(email);

        return user;
    };
    return BreederGenerator;
})();
