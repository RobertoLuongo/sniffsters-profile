var PhotosCtrl = (function () {
    function PhotosCtrl($scope, $state, toastr, DataService, CopyProfileService) {
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        this.CopyProfileService = CopyProfileService;
        this.BreederProfile = new BreederProfile();
        $scope.photos = this;
        this.BreederProfile = this.CopyProfileService.GetProfileClone();
    }
    PhotosCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    PhotosCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return PhotosCtrl;
})();
