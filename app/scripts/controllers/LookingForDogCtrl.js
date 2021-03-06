/// <reference path="IndexCtrl.ts" />
var LookingForDogCtrl = (function () {
    function LookingForDogCtrl($scope, $state, toastr, DataService) {
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.lookingForDog = this;
        $scope.home.IsSearchHidden = true;
    }
    LookingForDogCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    LookingForDogCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return LookingForDogCtrl;
})();
