var ExploreCtrl = (function () {
    function ExploreCtrl($scope, $state, toastr, DataService) {
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.explore = this;
    }
    ExploreCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    ExploreCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return ExploreCtrl;
})();