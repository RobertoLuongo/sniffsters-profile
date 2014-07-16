/// <reference path="HomeCtrl.ts" />

interface IFollowingsScope extends IHomeScope {
    followingsCtrl:FollowingsCtrl;
    ctrl:IndexCtrl;
    home:HomeCtrl;
    followings:any;
}
class FollowingsCtrl {

    constructor(public $scope:IFollowingsScope, $firebase, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.followings = this;

        $scope.home.auth.$getCurrentUser().then((user) => {
            $scope.home.Breedership($scope.home.FireProcess(user.email)).then(() => {

                var followingsUrl = $scope.home.MainUrl;
                followingsUrl += ($scope.home.isBreeder) ? 'breeders/' : 'lookers/';
                followingsUrl += $scope.home.FireProcess(user.email) + '/followings';
                $scope.followings = $firebase(new Firebase(followingsUrl));
            })
        })
    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}