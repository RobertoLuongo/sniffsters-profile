/// <reference path="HomeCtrl.ts" />
var LoginCtrl = (function () {
    function LoginCtrl($scope, $firebase, $firebaseSimpleLogin, $state, toastr, DataService) {
        this.$scope = $scope;
        this.$firebase = $firebase;
        this.$firebaseSimpleLogin = $firebaseSimpleLogin;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.login = this;
        $scope.home.IsSearchHidden = false;
        this.email = "";
        this.pass = "123456";
    }
    LoginCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    LoginCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return LoginCtrl;
})();
