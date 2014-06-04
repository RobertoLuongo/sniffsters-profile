var PhotosCtrl = (function () {
    function PhotosCtrl($scope, $state, toastr, DataService, CopyProfileService) {
        var _this = this;
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        this.CopyProfileService = CopyProfileService;
        $scope.photosCtrl = this;
        $scope.index.url = "photos";
        DataService.getGalleries().then(function (data) {
            _this.Galleries = data;
        }, function () {
            _this.ShowError('Error in getting Photo Galleries from the server');
        });
    }
    PhotosCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    PhotosCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return PhotosCtrl;
})();