var PhotosCtrl = (function () {
    function PhotosCtrl($scope, $state, data, toastr, DataService, CopyProfileService) {
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        this.CopyProfileService = CopyProfileService;
        $scope.index.menuIndex = 2;

        var newGallery = new Gallery();
        this.GalleriesNew = new Array(newGallery);

        $scope.photosCtrl = this;

        $scope.index.url = "photos";

        this.Galleries = data;
    }
    PhotosCtrl.prototype.saveNewGalleries = function () {
        var index = 0;
        this.updateGallery(this.GalleriesNew, index);
    };

    PhotosCtrl.prototype.updateGallery = function (galleries, index) {
        var _this = this;
        if (galleries.length == 0) {
            if (this.GalleriesNew.length == 0) {
                this.GalleriesNew.push(new Gallery());
            }
            return;
        }
        var gallery = galleries[index];

        this.DataService.updateGallery(gallery).then(function () {
            _this.GalleriesNew.splice(index, 1);
            _this.Galleries.push(gallery);

            _this.updateGallery(galleries, index);
        });
    };

    PhotosCtrl.prototype.addGallery = function () {
        this.GalleriesNew.push(new Gallery());
    };

    PhotosCtrl.prototype.setSelectedGallery = function (galleryId) {
        var galid = 0;
        var index = 0;
        this.Galleries.forEach(function (gallery) {
            if (gallery.Id === galleryId) {
                galid = index;
                return false;
            }
            index++;
        });
        this.SelectedGallery = this.Galleries[galid];
        this.$state.go('profile.photos2.galleries', { 'id': galid });
    };

    PhotosCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    PhotosCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };

    PhotosCtrl.prototype.CreateSelectedGalleryClone = function () {
        this.SelectedGalleryEdit = new Gallery();
        for (var key in this.SelectedGallery) {
            if (this.SelectedGallery.hasOwnProperty(key)) {
                this.SelectedGalleryEdit[key] = this.SelectedGallery[key];
            }
        }
    };
    return PhotosCtrl;
})();
