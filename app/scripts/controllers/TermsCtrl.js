/// <reference path="IndexCtrl.ts" />
var TermsCtrl = (function () {
    function TermsCtrl($scope, $state, toastr, DataService) {
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.terms = this;
        $scope.home.IsSearchHidden = false;
        $scope.home.IsHome = false;
    }
    TermsCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    TermsCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return TermsCtrl;
})();
