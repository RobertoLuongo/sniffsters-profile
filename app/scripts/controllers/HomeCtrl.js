/// <reference path="IndexCtrl.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase-simplelogin.d.ts" />
var HomeCtrl = (function () {
    function HomeCtrl($scope, $firebase, $firebaseSimpleLogin, $state, toastr, DataService) {
        var _this = this;
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.home = this;

        this.email = "breeder1@gmail.com";
        this.pass = "123456";

        var fref = new Firebase("https://torid-fire-6526.firebaseio.com/");
        $scope.auth = $firebaseSimpleLogin(fref);
        $scope.authAction = new FirebaseSimpleLogin(fref, function (error, user) {
            if (error) {
                // an error occurred while attempting login
                _this.ShowError(error.toString());
            } else if (user) {
                // user authenticated with Firebase
                //                this.ShowSuccess('Welcome to Sniffsters.com')
                /*                this.$state.go('messages');*/
            } else {
            }
        });

        this.Id = this.GetBreederName();
        this.IdFire = this.Id.replace(/\./g, '(p)');
    }
    HomeCtrl.prototype.Signin = function (email, pass) {
        this.$scope.authAction.login('password', {
            email: email,
            password: pass
        });
    };

    HomeCtrl.prototype.Logout = function () {
        //        console.log('Test');
        this.$scope.authAction.logout();
        //        this.ShowSuccess('You were successfully logged out');
    };

    HomeCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    HomeCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };

    HomeCtrl.prototype.GetBreederName = function () {
        var loggedUser = angular.element('#loggedUser');
        if (loggedUser == null) {
            return '';
        }
        var loggedUserTxt = loggedUser.text();

        var start = loggedUserTxt.indexOf(',') + 1;
        var finish = loggedUserTxt.indexOf('!');

        var userName = loggedUserTxt.substr(start, finish - start).trim();

        return userName;
    };
    return HomeCtrl;
})();
