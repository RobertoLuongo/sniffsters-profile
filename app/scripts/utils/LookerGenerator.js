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

        var usersRef = $firebase(new Firebase(userUrl));

        var userRef = usersRef.$child(email);
        var profileRef = userRef.$child('profile');

        user.Email = email;
        user.UserName = nickName;

        //        console.log(user);
        profileRef.$set(user);

        usersRef.$save(email);

        return user;
    };
    return LookerGenerator;
})();
