/// <reference path="IndexCtrl.ts" />
/// <reference path="../utils/IUserGenerator.ts" />
/// <reference path="../utils/BreederGenerator.ts" />
/// <reference path="../utils/LookerGenerator.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase-simplelogin.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angularfire/angularfire.d.ts" />


interface IHomeScope extends IMainScope {
    home:HomeCtrl;
    ctrl:IndexCtrl;

}
class HomeCtrl {
    userName:any;
    userNameFire:string;

    isBreeder:boolean;

    MainUrl:string;
    MainRef:Firebase;

    auth:any;

    Id:string;
    IdFire:string;
    IsHome:boolean;

    url:string;
    Followers:string[];
    Followings:string[];

    menuIndex:number;
    isOwner:boolean;
    hideMenu:boolean;

    constructor(public $scope, public $stateParams, public $firebase, public $firebaseSimpleLogin, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.home = this;
        this.menuIndex = 1;

        this.MainUrl = "https://torid-fire-6526.firebaseio.com/";
        this.MainRef = new Firebase(this.MainUrl);


        this.auth = this.$firebaseSimpleLogin(this.MainRef);
        this.auth.$getCurrentUser().then((user)=> {
            if (user === null) {
                return;
            }
            this.userName = user.email;
            this.userNameFire = this.FireProcess(this.userName);
            this.Breedership();
        });


    }


    Breedership() {
        var breederUrl = this.MainUrl + "breeders/" + this.userNameFire;


        var breederRef = this.$firebase(new Firebase(breederUrl));


        breederRef.$on('value', (snapshot:any)=> {
            var breeder = snapshot.snapshot.value;
            if (breeder !== null) {
                this.isBreeder = true;
            } else {
                this.isBreeder = false;
            }
            this.$scope.$apply();
        });


    }

    followUser(loggedUser:string, follower:string) {
        this.DataService.followUser(loggedUser, follower).then(()=> {

            this.$scope.home.AddToFollowings(follower);
        })
    }

    unFollowUser(loggedUser:string, follower:string) {
        this.DataService.unFollowUser(loggedUser, follower).then(()=> {
            this.$scope.home.RemoveFromFollowings(follower);
        })
    }


    AddToFollowings(userName:string) {
        this.Followings.push(this.FireUnProcess(userName));
    }

    RemoveFromFollowings(userName:string) {
        var index = this.Followings.indexOf(this.FireUnProcess(userName))
        this.Followings.splice(index, 1);
    }

    FireProcess(userName:string) {
        return userName.replace(/\./g, '(p)');
    }

    FireUnProcess(userName:string) {
        return userName.replace(/\(p\)/g, '.');

    }

    animationDirection(menuIndex:number):string {

        if (menuIndex > this.menuIndex)
            return 'slide-left';
        else
            return 'slide-right';
    }

    Register(email:string, pass:string, confpass:string, isBreeder:boolean) {


        if (pass.length < 5) {
            this.ShowError("Password should be not less than 5 symbols");
            return;
        }

        if (pass !== confpass) {
            this.ShowError("Passwords do not match");
            return;
        }

        this.auth.$createUser(email, pass).then(() => {
            // User is created
//            var userGenerator:IUserGenerator;

            if (isBreeder) {
                var breederGenerator = new BreederGenerator();
                breederGenerator.create(this.FireProcess(email), this.MainUrl, this.$firebase);
            } else {
                var lookerGenerator = new LookerGenerator();
                lookerGenerator.create(this.FireProcess(email), this.MainUrl, this.$firebase);
            }


            this.Signin(email, pass)
        }, (error)=> {
            this.ShowError(error);
        })
    }

    Signin(email:string, pass:string) {
        this.auth = this.$firebaseSimpleLogin(this.MainRef);

        this.auth.$login('password', {
            email: email,
            password: pass,
            rememberMe: true

        }).then((user)=> {

            if (user) {

                this.userName = user.email;
                this.Breedership();


//                // User Sign In
//                if (this.isBreeder===true) {
//                this.$state.go('user.profile.about1',{uname:user.email});
//                }
//
//                if (this.isBreeder===false) {
//                this.$state.go('looker.account',{uname:user.email});
//                }


            } else {
                // user logout
                this.$state.go('home');

            }


        }, (error)=> {
            this.ShowError(error);
        });
    }

    FacebookSignin() {
        this.auth.$login('facebook',
            {rememberMe: true}
        ).then((user)=> {
                if (user) {
                    this.userName = user.displayName;

                } else {
                    // user logout
                }
            }, (error)=> {
                this.ShowError(error);
            })
    }

    Logout() {
        this.userName = null;
        this.isBreeder = null;
        this.isOwner = null;

        this.auth.$logout();
        this.$state.go('home');
    }

    IsSearchHidden:boolean;

    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }


    Ownership() {
        var breederUserName:string = this.$stateParams.uname;


        if (this.auth.user === null)
            return false;
        this.isOwner = (breederUserName === this.auth.user.email);
        return this.isOwner;
    }

    navigate(menuIndex:number) {
        this.$scope.slide = this.animationDirection(menuIndex);
        this.hideMenu = false;


        if (menuIndex == 1) {
            this.menuIndex = 1;
            this.$state.go("user.profile.about1");
        }


        if (menuIndex == 2) {
            this.menuIndex = 2;
            this.$state.go('user.profile.photos2');
        }


        if (menuIndex == 3) {
            this.url = 'puppies';
            this.menuIndex = 3;
            this.$state.go('user.profile.puppies3');
        }


        if (menuIndex == 4) {
            this.url = 'details';
            this.menuIndex = 4;
            this.$state.go('user.profile.details4');
        }


        if (menuIndex == 5) {
            this.url = 'testimonials';
            this.menuIndex = 5;
            this.$state.go('user.profile.testimonials5');
        }

    }

}