/// <reference path="IndexCtrl.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase-simplelogin.d.ts" />

interface IHomeScope extends IMainScope {
    home:HomeCtrl;
    ctrl:IndexCtrl;
    auth:FirebaseSimpleLogin
    authAction:FirebaseSimpleLogin
}
class HomeCtrl {

    Id:string;
    IdFire:string;
    IsHome:boolean;


    constructor(public $scope:IHomeScope, $firebase, $firebaseSimpleLogin, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.home = this;

        this.email = "breeder1@gmail.com";
        this.pass = "123456";


        var fref = new Firebase("https://torid-fire-6526.firebaseio.com/");
        $scope.auth = $firebaseSimpleLogin(fref);
        $scope.authAction = new FirebaseSimpleLogin(fref, (error, user) => {
            if (error) {
                // an error occurred while attempting login
                this.ShowError(error.toString());
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


    email:string;
    pass:string;

    Signin(email:string, pass:string) {

        this.$scope.authAction.login('password', {
            email: email,
            password: pass
        });
    }

    Logout() {
//        console.log('Test');

        this.$scope.authAction.logout();

//        this.ShowSuccess('You were successfully logged out');
    }

    IsSearchHidden:boolean;

    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

    GetBreederName() {

        var loggedUser = angular.element('#loggedUser');
        if (loggedUser == null) {
            return '';
        }
        var loggedUserTxt:string = loggedUser.text();

        var start = loggedUserTxt.indexOf(',') + 1;
        var finish = loggedUserTxt.indexOf('!');


        var userName = loggedUserTxt.substr(start, finish - start).trim();

        return userName;


    }
}