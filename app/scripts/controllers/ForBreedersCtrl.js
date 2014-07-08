/// <reference path="IndexCtrl.ts" />
var ForBreedersCtrl = (function () {
    function ForBreedersCtrl($scope, $state, toastr, DataService) {
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.forBreeders = this;
    }
    ForBreedersCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    ForBreedersCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return ForBreedersCtrl;
})();
